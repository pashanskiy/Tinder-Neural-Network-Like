package components

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"image/jpeg"
	"net/http"
	"regexp"
	"sync"
	"time"

	"github.com/jmoiron/sqlx"
	"github.com/pashanskiy/tnn/components/grpctransport"
	"go.uber.org/atomic"
)

type AutoLikeInfo struct {
	Mutex         sync.Mutex
	RunAutoLike   bool
	StopAutoLike  bool
	Pass          bool
	LikedCount    int
	DislikedCount int
}

type AutoLikedStreamBuffer struct {
	Photos          [][]byte
	LikePercent     float32
	DislikePercent  float32
	SuccessAutoLike bool
	ErrorAutoLike   bool
}

//Автолайк- прогоняет каждую фотографию каждого аккаунта через выравнивающий алгоритм и 5 нейросетей, получая на выходе предсказание
//Т.Е. первым делом при помощи выравнивающего алгоритма(тангенсы там всякие, ужас) и 4х нейросетей(боже упаси) проверяет,
//	подходит ли фотография(есть ли там лицо, допустимый угол поворота лица, закрыто ли оно, засвечено и тд) в общем, валидно ли оно
//и 5я нейросеть предсказывает уже на подготовленной фотографии
//				СХЕМА:
//1 и 2 нейросеть определяет границы лица (MTCNN)
//далее алгоритм на фоне полученных данных вырезает квадрат 128x128px и выравнивает лицо, прямо как на паспорт
//3я нейросеть cutBackground_deconv_bnoptimized_munet, спасибо большое @anilsathyan7 (github), вырезает задний фон из квадрата
//4я нейросеть обучена уже мной, на тщательно отобранном датасете из 15000 фотографий (угадайте откуда выгруженных),
//	на предмет определения насколько идеально видно лицо, отсеивая все, где плохо его видно
//5я нейросеть уже обученная под вас, предсказывает по вышеподготовленным фотографиям (128x128x1)
func AutoLike(db *sqlx.DB, grpcNNClient grpctransport.GrpcServiceNNClient, wgExit *sync.WaitGroup, autoLikeInfo *AutoLikeInfo, autoLikedStreamBuffer chan AutoLikedStreamBuffer, token *atomic.String) {
	fmt.Println("autolike is started")
	wgExit.Add(1)
	regexExt := regexp.MustCompile(`\.(\w+)\?`)
	autoLikeInfo.Mutex.Lock()
	for autoLikeInfo.RunAutoLike && !autoLikeInfo.StopAutoLike {
		autoLikeInfo.Mutex.Unlock()
		//запрос на "пачку аккаунтов"
		data, err := sendRequest(token.Load(), "https://api.gotinder.com/v2/recs/core")

		if !checkErr(err) {
			autoLikedStreamBuffer <- AutoLikedStreamBuffer{ErrorAutoLike: true}
			autoLikeInfo.Mutex.Lock()
			autoLikeInfo.RunAutoLike = false
			continue
		}

		tst := TstructAll{}
		if !checkErr(json.Unmarshal(data, &tst)) {
			autoLikeInfo.Mutex.Lock()
			continue
		}
		if len(tst.Data.Results) > 0 {
			for _, r := range tst.Data.Results {
				autoLikeInfo.Mutex.Lock()
				if autoLikeInfo.StopAutoLike {
					autoLikeInfo.Mutex.Unlock()
					break
				}
				autoLikeInfo.Mutex.Unlock()
				var userPhotos [][]byte
				var cutFaces [][]byte
				for _, tPhoto := range r.User.Photos {
					photoBytes := loadPhoto(tPhoto.ProcessedFiles[0].URL)
					if photoBytes != nil {
						ext := regexExt.FindStringSubmatch(tPhoto.ProcessedFiles[0].URL)
						if len(ext) < 2 {
							continue
						}
						decodedImage, err := decodePhoto(photoBytes, ext[1])
						if !checkErr(err) {
							continue
						}
						if ext[1] == "webp" {
							bufferPhotoBytes := new(bytes.Buffer)
							checkErr(jpeg.Encode(bufferPhotoBytes, decodedImage, &jpeg.Options{Quality: 100}))
							photoBytes = bufferPhotoBytes.Bytes()
						}

						userPhotos = append(userPhotos, photoBytes) //

						faceDetect, err := grpcNNClient.GetFace(context.TODO(), &grpctransport.GetFaceRequest{PhotoBytes: photoBytes})
						if !checkErr(err) {
							continue
						}
						var vF []int //valid Faces on photo
						var validPhoto []byte

						for index, f := range faceDetect.Faces {
							if int(f.Width*f.Height) > 3000 {
								predict, err := grpcNNClient.CutBackgroundAndValidFace(context.TODO(), &grpctransport.CutBackgroundAndValidFaceRequest{PhotoBytes: RotateAndCutFace(f, convertImageToRGBA(decodedImage))})
								if checkErr(err) {
									if predict.Valid >= 0.9 {
										validPhoto = predict.PhotoBytes
										vF = append(vF, index)
									}
								}
							}
						}
						if len(vF) == 1 {
							cutFaces = append(cutFaces, validPhoto)
						}
					}
				}
				if len(cutFaces) == 0 {
					continue
				}
				predict, err := grpcNNClient.PredictFromBytes(context.TODO(), &grpctransport.PredictFromBytesRequest{PhotosBytes: cutFaces})
				if !checkErr(err) {
					continue
				}

				autoLikeInfo.Mutex.Lock()
				passOrIgnore := autoLikeInfo.Pass
				autoLikeInfo.Mutex.Unlock()

				if len(autoLikedStreamBuffer) > 9 {
					<-autoLikedStreamBuffer
				}
				likePercent, dislikePercent := BinaryToLikeDislike(predict)
				if likePercent > dislikePercent {
					sendLikeOrDislike(r.User.ID, token.Load(), passOrIgnore, true)
					autoLikeInfo.Mutex.Lock()
					autoLikeInfo.LikedCount++
					lC := autoLikeInfo.LikedCount
					autoLikeInfo.Mutex.Unlock()
					_, err := db.Exec("UPDATE preferences SET liked_users_count = $1", lC)
					checkErr(err)
				} else {
					sendLikeOrDislike(r.User.ID, token.Load(), passOrIgnore, false)
					autoLikeInfo.Mutex.Lock()
					autoLikeInfo.DislikedCount++
					dC := autoLikeInfo.DislikedCount
					autoLikeInfo.Mutex.Unlock()
					_, err := db.Exec("UPDATE preferences SET disliked_users_count = $1", dC)
					checkErr(err)
				}

				autoLikedStreamBuffer <- AutoLikedStreamBuffer{Photos: userPhotos, LikePercent: likePercent, DislikePercent: dislikePercent, SuccessAutoLike: true}
				// fmt.Println("len(autoLikedStreamBuffer)", len(autoLikedStreamBuffer))
			}
		} else {
			fmt.Println("kek")
			autoLikedStreamBuffer <- AutoLikedStreamBuffer{SuccessAutoLike: false}
			autoLikeInfo.Mutex.Lock()
			for !autoLikeInfo.StopAutoLike {
				autoLikeInfo.Mutex.Unlock()
				timeToNextBatch := 0
				if timeToNextBatch > 10 {
					autoLikeInfo.Mutex.Lock()
					break
				}
				timeToNextBatch++
				time.Sleep(time.Second)
				autoLikeInfo.Mutex.Lock()
			}
			autoLikeInfo.Mutex.Unlock()
		}

		autoLikeInfo.Mutex.Lock()
	}
	autoLikeInfo.RunAutoLike = false
	autoLikeInfo.Mutex.Unlock()

	close(autoLikedStreamBuffer)
	wgExit.Done()
	fmt.Println("autolike is stopped")
}

func sendLikeOrDislike(userId, token string, passOrIgnore, likeOrDislike bool) {
	// Create client
	client := &http.Client{}
	_ = client

	if likeOrDislike {
		req, err := http.NewRequest("POST", "https://api.gotinder.com/like/"+userId, nil)
		checkErr(err)
		req.Header.Add("X-Auth-Token", token)
		resp, err := client.Do(req)
		if checkErr(err) {
			if resp.Status == "200" {
				fmt.Println("Liked userId:", userId)
			}
		}
	} else {
		if passOrIgnore {
			req, err := http.NewRequest("OPTIONS", "https://api.gotinder.com/pass/"+userId, nil)
			checkErr(err)
			req.Header.Add("X-Auth-Token", token)
			resp, err := client.Do(req)
			if checkErr(err) {
				if resp.Status == "204" {
					fmt.Println("Disliked userId:", userId)
				}
			}
		} else {
			fmt.Println("Ignore userId:", userId)
		}
	}

	// if likeOrDislike {
	// 	fmt.Println("Liked")
	// } else {
	// 	fmt.Println("Disliked")
	// }
}
