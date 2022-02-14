package components

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"image"
	"image/jpeg"
	"io"
	"net/http"
	"os"
	"regexp"
	"strings"
	"sync"
	"time"

	"github.com/jmoiron/sqlx"
	"github.com/pashanskiy/tnn/components/grpctransport"
	"go.uber.org/atomic"
)

type DownloadInfo struct {
	Mutex                 sync.Mutex
	PhotosCountToDownload int
	NewAccountsCount      int
	UpdateAccountsCount   int
	SameAccountsCount     int
	MatchingAccounts      int
	PhotosNowCount        int
	DownloadedPhotosCount int
	SamePhotosCount       int
	MissingPhotosCount    int
	ErrPhotosCount        int
	MatchingNNPhotosCount int
	StopDownload          bool
	RunDownload           bool
	SuccessDownload       bool
	NNServiceErr          bool
}

type userIdWithPhotos struct {
	UserId                 string
	PhotoMap_id_url800x640 map[string]string
}

type LoadingPhotos struct {
	mutex        sync.Mutex
	TruePhotoId  string
	TruePhoto    []byte
	FalsePhotoId string
	FalsePhoto   []byte
}

type downloadNNPhotoDataStruct struct {
	UserDBId        int
	UserPhotosCount int
	PhotoDBId       int
	PhotoUId        string
	PhotoId         string
	PhotoURL        string
}

//запрашивает "пачку" юзеров, проверяет их фотографии на валидность при помощи нейросетей и в случае валидности сохраняет аккаут, его фотографии и обработанные для обучения вырезанные лица
func DownloadAccountsAndPhotosNN(ctx context.Context, db *sqlx.DB, grpcNNClient grpctransport.GrpcServiceNNClient, wgExit *sync.WaitGroup, token *atomic.String, downloadInfo *DownloadInfo, loadingPhotos *LoadingPhotos) {
	wgExit.Add(1)
	downloadInfo.Mutex.Lock()
	downloadInfo.StopDownload = false
	downloadInfo.RunDownload = true
	downloadInfo.SuccessDownload = true

	downloadInfo.Mutex.Unlock()

	goroutinesCount := 3
	downloadNNPhotoDataChan := make(chan downloadNNPhotoDataStruct)

	for i := 0; i < goroutinesCount; i++ {
		go DownloadPhotoAndCheckNN(db, grpcNNClient, downloadNNPhotoDataChan, downloadInfo, loadingPhotos)
	}

	downloadInfo.Mutex.Lock()
	for downloadInfo.MatchingNNPhotosCount < downloadInfo.PhotosCountToDownload && !downloadInfo.StopDownload {
		downloadInfo.Mutex.Unlock()
		data, err := sendRequest(token.Load(), "https://api.gotinder.com/v2/recs/core")

		checkErr(err)
		tst := TstructAll{}
		_ = json.Unmarshal(data, &tst)
		if len(tst.Data.Results) > 0 {
			downloadInfo.Mutex.Lock()
			downloadInfo.SuccessDownload = true
			downloadInfo.Mutex.Unlock()

			for _, r := range tst.Data.Results {
				if downloadInfo.StopDownload {
					break
				}

				userStruct := userIdWithPhotos{UserId: r.User.ID}
				userStruct.PhotoMap_id_url800x640 = make(map[string]string)
				for _, tPhoto := range r.User.Photos {
					userStruct.PhotoMap_id_url800x640[tPhoto.ID] = tPhoto.ProcessedFiles[0].URL
				}

				var userPhotoIdsFromDB []string
				row, err := db.Query("select photo_name from users inner join nn_photos on users.id = nn_photos.user_id where uid=$1", r.User.ID)
				for row.Next() {
					var photoNameFromDB string
					err = row.Scan(&photoNameFromDB)
					checkErr(err)
					userPhotoIdsFromDB = append(userPhotoIdsFromDB, strings.Split(photoNameFromDB, "_")[1])
				}

				if len(userPhotoIdsFromDB) != 0 {

					// Удаляем из загрузки уже существующие в БД фотографии
					for _, photoIdFromDB := range userPhotoIdsFromDB {
						for pmk := range userStruct.PhotoMap_id_url800x640 {
							if photoIdFromDB == pmk {
								downloadInfo.Mutex.Lock()
								downloadInfo.SamePhotosCount++
								downloadInfo.Mutex.Unlock()
								delete(userStruct.PhotoMap_id_url800x640, pmk)
							}
						}
					}

					if len(userStruct.PhotoMap_id_url800x640) == 0 {
						downloadInfo.Mutex.Lock()
						downloadInfo.SameAccountsCount++
						downloadInfo.Mutex.Unlock()
					} else {
						setPhotosToGoroutines(db, userStruct, downloadNNPhotoDataChan, downloadInfo)
						downloadInfo.Mutex.Lock()
						downloadInfo.UpdateAccountsCount++
						downloadInfo.Mutex.Unlock()
					}
				} else {
					_, _ = db.Exec("insert into users (uid) values ($1)", userStruct.UserId)
					setPhotosToGoroutines(db, userStruct, downloadNNPhotoDataChan, downloadInfo)
					downloadInfo.Mutex.Lock()
					downloadInfo.NewAccountsCount++
					downloadInfo.Mutex.Unlock()
				}
				checkErr(err)
			}
		} else {
			downloadInfo.Mutex.Lock()
			downloadInfo.SuccessDownload = false
			timeToNextBatch := 0
			for !downloadInfo.StopDownload {
				downloadInfo.Mutex.Unlock()
				if timeToNextBatch > 60 {
					downloadInfo.Mutex.Lock()
					break
				}
				timeToNextBatch++
				time.Sleep(time.Second)
				downloadInfo.Mutex.Lock()
			}
			downloadInfo.Mutex.Unlock()

		}
		downloadInfo.Mutex.Lock()
	}

	downloadInfo.RunDownload = false
	downloadInfo.Mutex.Unlock()
	close(downloadNNPhotoDataChan)

	wgExit.Done()
}

func setPhotosToGoroutines(db *sqlx.DB, userStruct userIdWithPhotos, downloadNNPhotoDataChan chan downloadNNPhotoDataStruct, downloadInfo *DownloadInfo) {
	var userDBId int
	userDBIdRow := db.QueryRow("select id from users where uid=$1", userStruct.UserId)
	_ = userDBIdRow.Scan(&userDBId)
	downloadInfo.Mutex.Lock()
	downloadInfo.PhotosNowCount += len(userStruct.PhotoMap_id_url800x640)
	downloadInfo.Mutex.Unlock()
	for photoId, photoUrl := range userStruct.PhotoMap_id_url800x640 {
		downloadNNPhotoDataChan <- downloadNNPhotoDataStruct{UserDBId: userDBId, PhotoUId: userStruct.UserId, PhotoId: photoId, PhotoURL: photoUrl}
	}
}

func DownloadPhotoAndCheckNN(db *sqlx.DB, grpcNNClient grpctransport.GrpcServiceNNClient, downloadNNPhotoDataChan chan downloadNNPhotoDataStruct,
	downloadInfo *DownloadInfo, loadingPhotos *LoadingPhotos) {
	regex := regexp.MustCompile(`\.(\w+)\?`)
	matchingUser := false
	for photoData := range downloadNNPhotoDataChan {
		photoBytes := loadPhoto(photoData.PhotoURL)
		if photoBytes != nil {
			ext := regex.FindStringSubmatch(photoData.PhotoURL)
			if len(ext) == 2 {
				decodedImage, err := decodePhoto(photoBytes, ext[1])
				if checkErr(err) {
					if ext[1] == "webp" {
						bufferPhotoBytes := new(bytes.Buffer)
						checkErr(jpeg.Encode(bufferPhotoBytes, decodedImage, &jpeg.Options{Quality: 100}))
						photoBytes = bufferPhotoBytes.Bytes()
					}
					photoName := photoData.PhotoUId + "_" + photoData.PhotoId + "_640x800.jpg"
					_, _ = db.Exec("insert into nn_photos (user_id, photo_name) values ($1, $2)", photoData.UserDBId, photoName)
					var photoDBId int
					photoDBIdRow := db.QueryRow("select id from nn_photos where photo_name=$1", photoName)
					_ = photoDBIdRow.Scan(&photoDBId)
					photoData.PhotoDBId = photoDBId
					if validPhotoJPG, valid := PhotoGetAndCheckValidFace(db, photoBytes, convertImageToRGBA(decodedImage), grpcNNClient, photoName, photoData, loadingPhotos); valid {
						f, err := os.Create("./resources/NNFace/" + photoName)
						checkErr(err)
						_, err = f.Write(validPhotoJPG)
						checkErr(err)
						f.Close()
						downloadInfo.Mutex.Lock()
						downloadInfo.MatchingNNPhotosCount++
						downloadInfo.Mutex.Unlock()
						matchingUser = true
					}
					downloadInfo.Mutex.Lock()
					downloadInfo.DownloadedPhotosCount++
					downloadInfo.Mutex.Unlock()
				} else {
					fmt.Println("Photo dont save:", "PhotoURL:", photoData.PhotoURL)
					errPhotoStatPlus(downloadInfo)
				}
			} else {
				errPhotoStatPlus(downloadInfo)
			}
		} else {
			downloadInfo.Mutex.Lock()
			downloadInfo.MissingPhotosCount++
			downloadInfo.Mutex.Unlock()
		}

		if matchingUser {
			downloadInfo.Mutex.Lock()
			downloadInfo.MatchingAccounts++
			downloadInfo.Mutex.Unlock()
		}
	}
}

func errPhotoStatPlus(downloadInfo *DownloadInfo) {
	downloadInfo.Mutex.Lock()
	downloadInfo.ErrPhotosCount++
	downloadInfo.Mutex.Unlock()
}

func loadPhoto(photoURL string) []byte {
	var photoBytes []byte
	response, _ := http.Get(photoURL)
	if response.StatusCode != 200 {
		return nil
	}
	buf := bytes.NewBuffer(photoBytes)
	_, _ = io.Copy(buf, response.Body)
	return buf.Bytes()
}

func PhotoGetAndCheckValidFace(db *sqlx.DB, photoBytes []byte, decodedImage *image.RGBA, grpcNNClient grpctransport.GrpcServiceNNClient, photoName string, photoData downloadNNPhotoDataStruct, loadingPhotos *LoadingPhotos) ([]byte, bool) {
	getFaceRequest := &grpctransport.GetFaceRequest{}
	getFaceRequest.PhotoId = photoName
	getFaceRequest.PhotoBytes = photoBytes
	run := true
	for run {
		faceDetect, err := grpcNNClient.GetFace(context.TODO(), getFaceRequest)
		if checkErr(err) {
			var sqlQuery string = `insert into detected_faces (
					photo_id, x, y, width, height, nose_x, 
					nose_y, left_eye_x, left_eye_y, right_eye_x, 
					right_eye_y, mouth_left_x, mouth_left_y, 
					mouth_right_x, mouth_right_y, confidence
				) 
				values 
					(
						$1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 
						$11, $12, $13, $14, $15, $16
					)`
			validFacesCount := 0
			var validFace *grpctransport.Face
			var validPhoto []byte
			for _, f := range faceDetect.Faces {
				if int(f.Width*f.Height) > 3000 { // Площадь лица для отсеивания ошибок (методом тыка выявлено, что площадь менее 3000 имеет почти экспоненциальный рост ошибочных решений)
					predict, err := grpcNNClient.CutBackgroundAndValidFace(context.TODO(), &grpctransport.CutBackgroundAndValidFaceRequest{PhotoBytes: RotateAndCutFace(f, decodedImage)})
					if checkErr(err) {
						if predict.Valid >= 0.9 {
							validFace = f
							validPhoto = predict.PhotoBytes
							validFacesCount++
						}
					}
				}
			}
			if validFacesCount == 1 {
				_, err = db.Exec(
					sqlQuery, photoData.PhotoDBId, validFace.X, validFace.Y, validFace.Width, validFace.Height,
					validFace.NoseX, validFace.NoseY, validFace.LeftEyeX, validFace.LeftEyeY, validFace.RightEyeX,
					validFace.LeftEyeY, validFace.MouthLeftX, validFace.MouthLeftY, validFace.MouthRightX,
					validFace.MouthRightY, validFace.Confidence)
				checkErr(err)
				_, err = db.Exec("update nn_photos set valid=$1 where id=$2", true, photoData.PhotoDBId)
				checkErr(err)
				setPhotoToLoading(loadingPhotos, true, photoName, photoBytes, faceDetect, photoData)
				file, _ := os.Create("./resources/NNDataSetPhotos/" + photoName)
				defer file.Close()
				_, err = file.Write(photoBytes)
				checkErr(err)
				file.Close()
				return validPhoto, true
			} else {
				_, err = db.Exec("update nn_photos set valid=$1 where id=$2", false, photoData.PhotoDBId)
				checkErr(err)
				setPhotoToLoading(loadingPhotos, false, photoName, photoBytes, faceDetect, photoData)
			}
			run = false
		} else {
			fmt.Println("Error: The NNServer is down, waiting for it to start...")
			fmt.Println("Photo:", photoName, "PhotoURL:", photoData.PhotoURL)
			fmt.Println(err)
			fmt.Println()
			time.Sleep(time.Second * 5)
		}
	}
	return nil, false
}

func setPhotoToLoading(loadingPhotos *LoadingPhotos, truePhoto bool, photoId string, photoBytes []byte, faces *grpctransport.GetFaceResponse, photoData downloadNNPhotoDataStruct) {
	drawedPhotoBytes, err := DrawImageBoxToPhoto(photoBytes, "jpg", faces)
	if checkErr(err) {
		loadingPhotos.mutex.Lock()
		if truePhoto {
			loadingPhotos.TruePhotoId = photoId
			loadingPhotos.TruePhoto = drawedPhotoBytes
		} else {
			loadingPhotos.FalsePhotoId = photoId
			loadingPhotos.FalsePhoto = drawedPhotoBytes
		}
		loadingPhotos.mutex.Unlock()
	} else {
		fmt.Println(err, "PhotoId:", photoId, "Valid:", truePhoto, "PhotoURL:", photoData.PhotoURL)
	}
}

func CreateFolders() {
	if _, err := os.Stat("./resources"); os.IsNotExist(err) {
		_ = os.Mkdir("./resources", os.ModePerm)
	}
	if _, err := os.Stat("./resources/NNDataSetPhotos"); os.IsNotExist(err) {
		_ = os.Mkdir("./resources/NNDataSetPhotos", os.ModePerm)
	}
	if _, err := os.Stat("./resources/NNFace"); os.IsNotExist(err) {
		_ = os.Mkdir("./resources/NNFace", os.ModePerm)
	}
	if _, err := os.Stat("./resources/NNWeights"); os.IsNotExist(err) {
		_ = os.Mkdir("./resources/NNWeights", os.ModePerm)
	}
}
