package components

import (
	"context"
	"fmt"
	"io/ioutil"
	"math"
	"math/rand"
	"os"
	"regexp"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/jmoiron/sqlx"
	"github.com/pashanskiy/tnn/components/grpctransport"
	"go.uber.org/atomic"
)

type GrpcService struct {
	db                    *sqlx.DB
	token                 *atomic.String
	downloadInfo          *DownloadInfo
	loadingPhotos         LoadingPhotos
	drawBox               bool
	trainingNow           *atomic.Bool
	faceDetectIsRun       *atomic.Bool
	allEpochCount         *atomic.Int32
	allBatchCount         *atomic.Int32
	weigthName            *atomic.String
	autolikeInfo          *AutoLikeInfo
	autoLikedStreamBuffer chan AutoLikedStreamBuffer
	wgExit                *sync.WaitGroup
	grpcNNClient          grpctransport.GrpcServiceNNClient
	grpctransport.UnimplementedGrpcServiceServer
}

func (s *GrpcService) GetToken(ctx context.Context, req *grpctransport.EmptyMessage) (*grpctransport.GetTokenResponse, error) {
	return &grpctransport.GetTokenResponse{ActualToken: CheckToken(s.token.Load()), Token: s.token.Load()}, nil
}

func (s *GrpcService) SetToken(ctx context.Context, req *grpctransport.SetTokenRequest) (*grpctransport.SetTokenResponse, error) {
	success := false
	token := GetTokenFromDB(s.db)
	fmt.Println("Old token from DB: " + token)
	fmt.Println("New token from DB: " + req.Token)
	s.token.Store(req.Token)
	_, err := s.db.Exec("update preferences set token = $1", req.Token)
	checkErr(err)
	if CheckToken(req.Token) {
		fmt.Println("Токен актуален")
		success = true
	} else {
		fmt.Println("Токен не актуален")
	}
	return &grpctransport.SetTokenResponse{ActualToken: success}, nil
}

func (s *GrpcService) GetDownloadedInfoFromDB(ctx context.Context, req *grpctransport.EmptyMessage) (*grpctransport.GetDownloadInfoFromDBResponse, error) {
	resp := &grpctransport.GetDownloadInfoFromDBResponse{}
	checkErr(s.db.Get(&resp.NNDataSetAccountsCount, "select count(distinct id) from (select user_id from nn_photos where valid=1) q inner join users a on q.user_id = a.id"))
	checkErr(s.db.Get(&resp.NNDataSetCount, "select count(id) from nn_photos where valid=1"))
	checkErr(s.db.Get(&resp.NNDataSetSwipedAccountsCount, "select count(id) from users where user_like is not null"))
	checkErr(s.db.Get(&resp.NNDataSetSwipedPhotosCount, "SELECT count(nn_photos.id) FROM users INNER JOIN nn_photos ON nn_photos.user_id = users.id WHERE valid = 1 AND user_like is not null"))
	checkErr(s.db.Get(&resp.DownloadedAccountsCount, "select count(id) from users"))
	checkErr(s.db.Get(&resp.DownloadedPhotosCount, "select count(id) from nn_photos"))
	s.downloadInfo.Mutex.Lock()
	resp.RunDownload = s.downloadInfo.RunDownload
	s.downloadInfo.Mutex.Unlock()
	return resp, nil
}

type idPhoto struct {
	Id         int
	Photo_name string
}

type faceBox struct {
	X          int
	Y          int
	Width      int
	Height     int
	Confidence float32
}

func (s *GrpcService) GetUsers(ctx context.Context, req *grpctransport.GetUsersRequest) (*grpctransport.GetUsersResponse, error) {
	var users []*grpctransport.User
	var userIds []int32
	checkErr(s.db.Select(&userIds, "SELECT users.id FROM users INNER JOIN nn_photos ON nn_photos.user_id = users.id WHERE nn_photos.valid = 1 AND users.id > $1 AND users.user_like IS NULL GROUP BY users.id ORDER BY users.id LIMIT $2", req.FromUserID, req.CountOfUsers))
	for _, id := range userIds {
		var idPhotos []idPhoto
		checkErr(s.db.Select(&idPhotos, "SELECT id, photo_name FROM nn_photos WHERE valid = 1 AND user_id = $1", id))
		var photosBts [][]byte

		for _, idPhoto := range idPhotos {
			if photo, err := ioutil.ReadFile("./resources/NNDataSetPhotos/" + idPhoto.Photo_name); err == nil {
				if s.drawBox {
					faces := []faceBox{}
					checkErr(s.db.Select(&faces, "select x, y, width, height, confidence from detected_faces where photo_id=$1", idPhoto.Id))
					photoBox, err := DrawImageBoxToPhoto(photo, strings.Split(idPhoto.Photo_name, ".")[1], faces)
					if checkErr(err) {
						photosBts = append(photosBts, photoBox)
					} else {
						fmt.Println("Invalid photo:", idPhoto.Photo_name)
					}
				} else {
					photosBts = append(photosBts, photo)
				}
			} else {
				_, _ = s.db.Exec("DELETE FROM detected_faces where photo_id = $1", idPhoto.Id)
				_, _ = s.db.Exec("DELETE FROM nn_photos where id = $1", idPhoto.Id)
				fmt.Println("Warning: The photo does not exist in the NNDataSetPhotos folder:")
				fmt.Println("Photo name:", idPhoto.Photo_name)
				fmt.Println("This photo has been removed from the database.")
			}
		}

		if len(photosBts) != 0 {
			users = append(users, &grpctransport.User{UserID: id, Pic: photosBts})
		}
	}
	return &grpctransport.GetUsersResponse{Users: users}, nil
}

func (s *GrpcService) LikeDislike(ctx context.Context, req *grpctransport.LikeDislikeRequest) (*grpctransport.EmptyMessage, error) {
	_, err := s.db.Exec("UPDATE users SET user_like = $1 WHERE id = $2", req.LikeDislike, int(req.UserId))
	checkErr(err)
	return &grpctransport.EmptyMessage{}, nil
}

func (s *GrpcService) PredictUser(ctx context.Context, req *grpctransport.PredictUserRequest) (*grpctransport.PredictUserResponse, error) {
	readDir := "./resources/NNFace/"
	// fmt.Println("predictUserRequest userId:", req.UserId)
	predictUserResponse := &grpctransport.PredictUserResponse{}
	predictUserResponse.UserId = req.UserId
	var photosNames []string
	checkErr(s.db.Select(&photosNames, "SELECT photo_name FROM nn_photos WHERE valid=1 AND user_id=$1", req.UserId))
	if len(photosNames) != 0 {
		var cutFacesBytes [][]byte
		for _, photoName := range photosNames {
			photoBytes, err := ioutil.ReadFile(readDir + photoName)
			checkErr(err)
			cutFacesBytes = append(cutFacesBytes, photoBytes)
		}
		predict, err := s.grpcNNClient.PredictFromBytes(context.Background(), &grpctransport.PredictFromBytesRequest{PhotosBytes: cutFacesBytes})
		checkErr(err)
		predictUserResponse.LikePercent, predictUserResponse.DislikePercent = BinaryToLikeDislike(predict)
	}
	return predictUserResponse, nil
}

func (s *GrpcService) SetDownloadPhotos(ctx context.Context, req *grpctransport.SetDownloadPhotosRequest) (*grpctransport.SetDownloadPhotosResponse, error) {
	_, err := s.grpcNNClient.PingNN(context.TODO(), &grpctransport.EmptyMessageNN{})
	if s.downloadInfo.RunDownload {
		if checkErr(err) {
			return &grpctransport.SetDownloadPhotosResponse{SuccessRun: false, NNServiceRun: true}, nil
		} else {
			return &grpctransport.SetDownloadPhotosResponse{SuccessRun: false, NNServiceRun: false}, nil
		}
	} else {
		if checkErr(err) {
			s.downloadInfo.Mutex.Lock()
			*s.downloadInfo = DownloadInfo{}
			s.downloadInfo.PhotosCountToDownload = int(req.PhotosCount)
			go DownloadAccountsAndPhotosNN(ctx, s.db, s.grpcNNClient, s.wgExit, s.token, s.downloadInfo, &s.loadingPhotos)
			return &grpctransport.SetDownloadPhotosResponse{SuccessRun: true, NNServiceRun: true}, nil
		} else {
			return &grpctransport.SetDownloadPhotosResponse{SuccessRun: false, NNServiceRun: false}, nil
		}
	}
}

func (s *GrpcService) StopDownload(ctx context.Context, req *grpctransport.EmptyMessage) (*grpctransport.EmptyMessage, error) {
	s.downloadInfo.Mutex.Lock()
	s.downloadInfo.StopDownload = true
	s.downloadInfo.Mutex.Unlock()
	return &grpctransport.EmptyMessage{}, nil
}

func (s *GrpcService) DrawBox(ctx context.Context, req *grpctransport.DrawBoxRequest) (*grpctransport.TrueFalse, error) {
	if req.Set {
		s.drawBox = req.DrawBox
		_, err := s.db.Exec("UPDATE preferences SET draw_box = $1", req.DrawBox)
		checkErr(err)
		return &grpctransport.TrueFalse{}, nil
	} else {
		return &grpctransport.TrueFalse{Boolean: s.drawBox}, nil
	}
}

func (s *GrpcService) PassOrIgnore(ctx context.Context, req *grpctransport.PassOrIgnoreRequest) (*grpctransport.PassOrIgnoreResponse, error) {
	if req.Set {
		s.autolikeInfo.Mutex.Lock()
		s.autolikeInfo.Pass = req.Pass
		s.autolikeInfo.Mutex.Unlock()
		_, err := s.db.Exec("UPDATE preferences SET user_pass = $1", req.Pass)
		checkErr(err)
		return &grpctransport.PassOrIgnoreResponse{}, nil
	} else {
		s.autolikeInfo.Mutex.Lock()
		userPass := s.autolikeInfo.Pass
		s.autolikeInfo.Mutex.Unlock()
		return &grpctransport.PassOrIgnoreResponse{Pass: userPass}, nil
	}
}

func (s *GrpcService) DeleteLastLikes(ctx context.Context, req *grpctransport.SetLikeToNullLastNUsers) (*grpctransport.EmptyMessage, error) {
	var usersIdsToUnlike []int
	checkErr(s.db.Select(&usersIdsToUnlike, "SELECT id FROM users WHERE user_like IS NOT NULL ORDER BY id DESC LIMIT $1", req.CountLastUsers))
	for _, userId := range usersIdsToUnlike {
		_, err := s.db.Exec("UPDATE users SET user_like=NULL WHERE id=$1", userId)
		checkErr(err)
	}
	return &grpctransport.EmptyMessage{}, nil
}

func (s *GrpcService) DeleteAllLikes(ctx context.Context, req *grpctransport.EmptyMessage) (*grpctransport.EmptyMessage, error) {
	_, err := s.db.Exec("UPDATE users SET user_like=NULL")
	checkErr(err)
	return &grpctransport.EmptyMessage{}, nil
}

func (s *GrpcService) GetPossibilityDeleteLastLikes(ctx context.Context, req *grpctransport.SetLikeToNullLastNUsers) (*grpctransport.PossibilityDeleteLastLikes, error) {
	var countOfLikedUsers int
	checkErr(s.db.Get(&countOfLikedUsers, "SELECT COUNT(id) FROM users WHERE user_like IS NOT NULL"))
	if countOfLikedUsers > 0 {
		return &grpctransport.PossibilityDeleteLastLikes{Possibility: true}, nil
	}
	return &grpctransport.PossibilityDeleteLastLikes{Possibility: false}, nil
}

func (s *GrpcService) PermanentlyDeleteAllInfo(ctx context.Context, req *grpctransport.EmptyMessage) (*grpctransport.EmptyMessage, error) {
	s.db.Close()
	CreateDB()
	var err error
	s.db, err = OpenDB()
	checkErr(err)
	s.autolikeInfo.Mutex.Lock()
	s.autolikeInfo.LikedCount = 0
	s.autolikeInfo.DislikedCount = 0
	s.autolikeInfo.Mutex.Unlock()
	deleteWeigths()
	deletePhotos("./resources/NNDataSetPhotos/")
	deletePhotos("./resources/NNFace/")
	return &grpctransport.EmptyMessage{}, nil
}

func (s *GrpcService) RunAutoLike(ctx context.Context, req *grpctransport.EmptyMessage) (*grpctransport.EmptyMessage, error) {
	s.autolikeInfo.Mutex.Lock()
	fmt.Println("run autolike", s.autolikeInfo.RunAutoLike)
	if !s.autolikeInfo.RunAutoLike {
		s.autolikeInfo.RunAutoLike = true
		s.autolikeInfo.StopAutoLike = false
		s.autoLikedStreamBuffer = make(chan AutoLikedStreamBuffer, 10)
		s.autolikeInfo.Mutex.Unlock()
		go AutoLike(s.db, s.grpcNNClient, s.wgExit, s.autolikeInfo, s.autoLikedStreamBuffer, s.token)
		s.autolikeInfo.Mutex.Lock()
	}
	s.autolikeInfo.Mutex.Unlock()
	return &grpctransport.EmptyMessage{}, nil
}

func (s *GrpcService) StopAutoLike(ctx context.Context, req *grpctransport.EmptyMessage) (*grpctransport.EmptyMessage, error) {
	s.autolikeInfo.Mutex.Lock()
	s.autolikeInfo.StopAutoLike = true
	s.autolikeInfo.Mutex.Unlock()
	return &grpctransport.EmptyMessage{}, nil
}

func (s *GrpcService) GetAutoLikeIsRun(ctx context.Context, req *grpctransport.EmptyMessage) (*grpctransport.GetAutoLikeIsRunResponse, error) {
	getAutoLikeIsRunResponse := grpctransport.GetAutoLikeIsRunResponse{}
	s.autolikeInfo.Mutex.Lock()
	getAutoLikeIsRunResponse.AutoLikeRun = s.autolikeInfo.RunAutoLike
	getAutoLikeIsRunResponse.LikedCount = int32(s.autolikeInfo.LikedCount)
	getAutoLikeIsRunResponse.DislikedCount = int32(s.autolikeInfo.DislikedCount)
	s.autolikeInfo.Mutex.Unlock()
	return &getAutoLikeIsRunResponse, nil
}

func (s *GrpcService) StartTrain(ctx context.Context, req *grpctransport.TrainRequest) (*grpctransport.TrainResponse, error) {
	if s.trainingNow.Load() {
		return &grpctransport.TrainResponse{}, nil
	}
	s.trainingNow.Store(true)
	s.wgExit.Add(1)
	s.weigthName.Store("")
	deleteWeigths()
	fitAllToModelRequest := grpctransport.FitAllToModelRequest{CountOfEpochs: req.CountOfEpochs}

	// берем фото из бд по категориям лайк/дизлайк
	photoNameLike := []photoNameLikeStruct{}
	checkErr(s.db.Select(&photoNameLike, `SELECT nn_photos.photo_name, users.user_like FROM nn_photos 
	INNER JOIN users ON nn_photos.user_id = users.id WHERE nn_photos.valid = 1 AND users.user_like = 1`))
	var photoNameDislike []photoNameLikeStruct
	checkErr(s.db.Select(&photoNameDislike, `SELECT nn_photos.photo_name, users.user_like FROM nn_photos 
	INNER JOIN users ON nn_photos.user_id = users.id WHERE nn_photos.valid = 1 AND users.user_like = 0`))

	// перемешиваем фото по рандому в обоих категориях
	rand.Seed(time.Now().UnixNano())
	rand.Shuffle(len(photoNameLike), func(i, j int) {
		photoNameLike[i], photoNameLike[j] = photoNameLike[j], photoNameLike[i]
	})
	rand.Shuffle(len(photoNameDislike), func(i, j int) {
		photoNameDislike[i], photoNameDislike[j] = photoNameDislike[j], photoNameDislike[i]
	})

	// выравнивание датасета один к одному лайк/дизлайк (удаляя n-последних фоток из большей категории), если это требуется
	if req.AlignDS {
		if len(photoNameLike) > len(photoNameDislike) {
			photoNameLike = photoNameLike[:len(photoNameDislike)]
		} else {
			photoNameDislike = photoNameDislike[:len(photoNameLike)]
		}
	}

	// копируем последние 15% каждой категории и вставляем в тестовый датасет
	for i := int(math.Floor(float64(len(photoNameLike)) / 100 * 85)); i < len(photoNameLike); i++ {
		fitAllToModelRequest.PhotoNameLikeValidate = append(fitAllToModelRequest.PhotoNameLikeValidate, &grpctransport.PhotoNameLike{PhotoName: photoNameLike[i].Photo_name, Like: photoNameLike[i].User_like})
	}
	for i := int(math.Floor(float64(len(photoNameDislike)) / 100 * 85)); i < len(photoNameDislike); i++ {
		fitAllToModelRequest.PhotoNameLikeValidate = append(fitAllToModelRequest.PhotoNameLikeValidate, &grpctransport.PhotoNameLike{PhotoName: photoNameDislike[i].Photo_name, Like: photoNameDislike[i].User_like})
	}

	// копируем первые 85% каждой категории в тренировочный датасет
	lastIndex85Percent := int(math.Floor(float64(len(photoNameLike)) / 100 * 85))
	for i := 0; i < lastIndex85Percent; i++ {
		fitAllToModelRequest.PhotoNameLike = append(fitAllToModelRequest.PhotoNameLike, &grpctransport.PhotoNameLike{PhotoName: photoNameLike[i].Photo_name, Like: photoNameLike[i].User_like})
	}
	lastIndex85Percent = int(math.Floor(float64(len(photoNameDislike)) / 100 * 85))
	for i := 0; i < lastIndex85Percent; i++ {
		fitAllToModelRequest.PhotoNameLike = append(fitAllToModelRequest.PhotoNameLike, &grpctransport.PhotoNameLike{PhotoName: photoNameDislike[i].Photo_name, Like: photoNameDislike[i].User_like})
	}

	// рандомно перемешиваем лайки и дизлайки в тренировочном датасете
	rand.Seed(time.Now().UnixNano())
	rand.Shuffle(len(fitAllToModelRequest.PhotoNameLike), func(i, j int) {
		fitAllToModelRequest.PhotoNameLike[i], fitAllToModelRequest.PhotoNameLike[j] = fitAllToModelRequest.PhotoNameLike[j], fitAllToModelRequest.PhotoNameLike[i]
	})

	// запуск обучения
	go func() {
		ticker := time.NewTicker(time.Second * 5)
		go func() {
			for {
				<-ticker.C
				deleteBadlyWeigths()
			}
		}()

		_, err := s.grpcNNClient.FitAllToModel(context.TODO(), &fitAllToModelRequest)
		checkErr(err)

		ticker.Stop()
		time.Sleep(2 * time.Second) // ждем дозаписи последнего веса, так, на всякий случай

		bestWeigth := deleteBadlyWeigths()
		fmt.Println("bestWeigth:", bestWeigth)
		// загружаем лучшую эпоху
		_, _ = s.grpcNNClient.LoadWeigths(context.TODO(), &grpctransport.EmptyMessageNN{})
		time.Sleep(time.Second)
		s.weigthName.Store(bestWeigth)

		s.trainingNow.Toggle()
		s.wgExit.Done()
	}()

	s.allEpochCount.Store(req.CountOfEpochs)
	s.allBatchCount.Store(int32(len(fitAllToModelRequest.PhotoNameLike) / 32))
	return &grpctransport.TrainResponse{AllEpochCount: req.CountOfEpochs, AllBatchCount: s.allBatchCount.Load()}, nil
}

func (s *GrpcService) GetTrainingNow(ctx context.Context, req *grpctransport.EmptyMessage) (*grpctransport.TrainResponse, error) {
	return &grpctransport.TrainResponse{TrainingNow: s.trainingNow.Load(), AllEpochCount: s.allEpochCount.Load(), AllBatchCount: s.allBatchCount.Load()}, nil
}

func (s *GrpcService) GetWeigthName(ctx context.Context, req *grpctransport.EmptyMessage) (*grpctransport.GetWeigthNameResponse, error) {
	return &grpctransport.GetWeigthNameResponse{WeigthName: s.weigthName.Load()}, nil
}

func (s *GrpcService) LikeDislikeCountPhotosFromDB(ctx context.Context, req *grpctransport.EmptyMessage) (*grpctransport.LikeDislikeCountPhotosFromDBResponse, error) {
	var likePhotosCount int32
	var dislikePhotosCount int32
	checkErr(s.db.Get(&likePhotosCount, "SELECT COUNT(nn_photos.photo_name) FROM users INNER JOIN nn_photos ON users.id = nn_photos.user_id WHERE user_like = 1 AND valid = 1"))
	checkErr(s.db.Get(&dislikePhotosCount, "SELECT COUNT(nn_photos.photo_name) FROM users INNER JOIN nn_photos ON users.id = nn_photos.user_id WHERE user_like = 0 AND valid = 1"))
	// fmt.Println("CountOfPhotos: like", likePhotosCount, "dislike", dislikePhotosCount)
	return &grpctransport.LikeDislikeCountPhotosFromDBResponse{LikeCount: likePhotosCount, DislikeCount: dislikePhotosCount}, nil
}

func (s *GrpcService) GetTokenTutorial(ctx context.Context, req *grpctransport.EmptyMessage) (*grpctransport.GetTokenTutorialResponse, error) {
	getTokenTutorial := &grpctransport.GetTokenTutorialResponse{}
	var err error
	getTokenTutorial.TokenTutorial, err = ioutil.ReadFile("./front/TokenTutorial.mp4")
	if checkErr(err) {
		return getTokenTutorial, nil
	}
	return nil, err
}

func deleteBadlyWeigths() string {
	readDir := "./resources/NNWeights/"
	files, err := ioutil.ReadDir(readDir)
	checkErr(err)
	regex, _ := regexp.Compile(`^E(\d+)_VL((\d)[.](\d+))_VA((\d)[.](\d+))\.hdf5$`)

	bestWeight := struct {
		FileName string
		Loss     float64
		Accuracy float64
	}{}

	// удаление худших эпох по данным тестового датасета, по алгоритму: loss < previousLoss && accuracy > previousAccuracy
	for _, file := range files {
		if !regex.MatchString(file.Name()) {
			continue
		}
		regexGroups := regex.FindStringSubmatch(file.Name())
		if len(regexGroups) == 8 {
			loss := 0.0
			acc := 0.0
			if valLoss, err := strconv.ParseFloat(regexGroups[2], 64); checkErr(err) {
				loss = valLoss
			} else {
				fmt.Println("Error: Parse ValLoss (parseQuary.go, deleteBadlyWeigths)")
			}
			if valAcc, err := strconv.ParseFloat(regexGroups[5], 64); checkErr(err) {
				acc = valAcc
			} else {
				fmt.Println("Error: Parse ValAccuacy (parseQuary.go, deleteBadlyWeigths)")
			}
			if (loss <= bestWeight.Loss && acc >= bestWeight.Accuracy) || (bestWeight.Loss == 0 && bestWeight.Accuracy == 0) {
				if bestWeight.FileName != "" {
					checkErr(os.Remove(readDir + bestWeight.FileName))
				}
				bestWeight.FileName = file.Name()
				bestWeight.Loss = loss
				bestWeight.Accuracy = acc
			} else {
				checkErr(os.Remove(readDir + file.Name()))
			}
		} else {
			fmt.Println("Error: Regex groups != 8 (parseQuary.go, deleteBadlyWeigths)")
		}
	}

	if bestWeight.Accuracy != 0 {
		return bestWeight.FileName
	}
	fmt.Println("Error: Weight does not exit (parseQuary.go, deleteBadlyWeigths)")
	return ""
}

func deleteWeigths() {
	files, err := ioutil.ReadDir("./resources/NNWeights/")
	if !checkErr(err) {
		return
	}
	regex, _ := regexp.Compile(`^E(\d+)_VL((\d)[.](\d+))_VA((\d)[.](\d+))\.hdf5$`)
	for _, file := range files {
		if regex.MatchString(file.Name()) {
			checkErr(os.Remove("./resources/NNWeights/" + file.Name()))
		}
	}
}

func deletePhotos(photosDir string) {
	files, err := ioutil.ReadDir(photosDir)
	if checkErr(err) {
		regex, _ := regexp.Compile(`^[a-f0-9]{24}_[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}_\d+x\d+.(jpg)$`)
		for _, file := range files {
			if regex.MatchString(file.Name()) {
				checkErr(os.Remove(photosDir + file.Name()))
			}
		}
	}
}

//rpc streams

func (s *GrpcService) StreamingDownloadInfo(req *grpctransport.EmptyMessage, stream grpctransport.GrpcService_StreamingDownloadInfoServer) error {
	withoutErr := true
	for s.downloadInfo.RunDownload && withoutErr {
		withoutErr = sendDownloadInfo(stream, s.downloadInfo)
		time.Sleep(time.Second / 2)
	}
	sendDownloadInfo(stream, s.downloadInfo)
	return nil
}

func (s *GrpcService) StreamingGetFaceDetectRunInfo(req *grpctransport.EmptyMessage, stream grpctransport.GrpcService_StreamingGetFaceDetectRunInfoServer) error {
	streamErr := error(nil)
	for streamErr == nil {
		time.Sleep(time.Second)
		streamErr = stream.Send(&grpctransport.GetFaceDetectRunInfoResponse{FaceDetectRun: s.faceDetectIsRun.Load()})
	}
	return nil
}

func (s *GrpcService) StreamingGetLoadingPhotos(req *grpctransport.EmptyMessage, stream grpctransport.GrpcService_StreamingGetLoadingPhotosServer) error {
	var tpi string
	var fpi string
	withoutErr := true
	for s.downloadInfo.RunDownload && withoutErr {
		loadingPhotosResponse := &grpctransport.GetLoadingPhotosResponse{}
		s.loadingPhotos.mutex.Lock()
		if s.loadingPhotos.TruePhotoId == tpi {
			loadingPhotosResponse.TrueNew = false
		} else {
			tpi = s.loadingPhotos.TruePhotoId
			loadingPhotosResponse.TrueNew = true
			loadingPhotosResponse.TruePhoto = s.loadingPhotos.TruePhoto
		}
		if s.loadingPhotos.FalsePhotoId == fpi {
			loadingPhotosResponse.FalseNew = false
		} else {
			fpi = s.loadingPhotos.FalsePhotoId
			loadingPhotosResponse.FalseNew = true
			loadingPhotosResponse.FalsePhoto = s.loadingPhotos.FalsePhoto
		}
		s.loadingPhotos.mutex.Unlock()
		if loadingPhotosResponse.TrueNew || loadingPhotosResponse.FalseNew {
			withoutErr = checkErr(stream.Send(loadingPhotosResponse))
		}
		time.Sleep(time.Second / 10)
	}
	return nil
}

func (s *GrpcService) StreamingTrainStatus(req *grpctransport.EmptyMessage, stream grpctransport.GrpcService_StreamingTrainStatusServer) error {
	// получение статуса обучения в режиме реального времени раз в 100 миллисекунд
	fitStatusResponse := grpctransport.FitStatusResponse{}
	for {
		time.Sleep(100 * time.Millisecond)
		if !s.trainingNow.Load() {
			break
		}
		fitStatusResponseNN, err := s.grpcNNClient.GetStatusOfFit(context.TODO(), &grpctransport.EmptyMessageNN{})
		checkErr(err)
		fitStatusResponse.Epoch = fitStatusResponseNN.Epoch
		fitStatusResponse.Batch = fitStatusResponseNN.Batch
		fitStatusResponse.Training = s.trainingNow.Load()
		if stream.Send(&fitStatusResponse) != nil {
			break
		}
	}
	return nil
}

func (s *GrpcService) StreamingAutoLike(req *grpctransport.EmptyMessage, stream grpctransport.GrpcService_StreamingAutoLikeServer) error {
	for aLSB := range s.autoLikedStreamBuffer {
		if !checkErr(stream.Send(&grpctransport.AutoLikeResponse{
			Photos:          aLSB.Photos,
			LikePercent:     aLSB.LikePercent,
			DislikePercent:  aLSB.DislikePercent,
			SuccessAutoLike: aLSB.SuccessAutoLike,
			ErrorAutoLike:   aLSB.ErrorAutoLike,
		})) {
			fmt.Println("Stop stream")
			break
		}
	}
	return nil
}

type photoNameLikeStruct struct {
	Photo_name string
	User_like  bool
}

func sendDownloadInfo(stream grpctransport.GrpcService_StreamingDownloadInfoServer, downloadInfo *DownloadInfo) bool {
	downloadInfo.Mutex.Lock()
	d := *downloadInfo
	downloadInfo.Mutex.Unlock()
	d.Mutex.Unlock()
	err := stream.Send(&grpctransport.DownloadInfoResponse{
		NewAccounts:             int32(d.NewAccountsCount),
		UpdateAccounts:          int32(d.UpdateAccountsCount),
		SameAccounts:            int32(d.SameAccountsCount),
		PhotosNow:               int32(d.PhotosNowCount),
		MatchingAccounts:        int32(d.MatchingAccounts),
		CountOfDownloadedPhotos: int32(d.DownloadedPhotosCount),
		CountOfSamePhotos:       int32(d.SamePhotosCount),
		CountOfMissingPhotos:    int32(d.MissingPhotosCount),
		MatchingNNPhotosCount:   int32(d.MatchingNNPhotosCount),
		ErrPhotosCount:          int32(d.ErrPhotosCount),
		SuccessDownload:         d.SuccessDownload,
		RunDownload:             d.RunDownload,
	})
	return checkErr(err)
}
