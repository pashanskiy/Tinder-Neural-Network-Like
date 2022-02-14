package components

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net"
	"net/http"
	"os"
	"os/exec"
	"os/signal"
	"regexp"
	"runtime"
	"sync"
	"time"

	"github.com/improbable-eng/grpc-web/go/grpcweb"
	"github.com/jmoiron/sqlx"
	"github.com/pashanskiy/tnn/components/grpctransport"
	grpcLibrary "github.com/pashanskiy/tnn/components/grpctransport"
	"go.uber.org/atomic"
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"
	"google.golang.org/grpc"
)

func HTTPServer(db *sqlx.DB) {
	fmt.Println("Tinder Neural Network Like v0.2 by Pashanskiy")

	GRPCConnect, err := grpc.Dial(":8091", grpc.WithInsecure())
	checkErr(err)
	grpcNNClient := grpctransport.NewGrpcServiceNNClient(GRPCConnect)

	downloadInfo := &DownloadInfo{}
	likedUsers, dislikedUsers := GetLikedAndDislikedUsersFromDB(db)
	autoLikeInfo := &AutoLikeInfo{RunAutoLike: false, Pass: GetPassOrIgnoreFromDB(db), LikedCount: likedUsers, DislikedCount: dislikedUsers}
	var wgExit sync.WaitGroup
	var token atomic.String
	var trainingNow atomic.Bool
	var allEpochCount atomic.Int32
	var allBatchCount atomic.Int32
	var weigthName atomic.String
	var faceDetectIsRun atomic.Bool

	token.Store(GetTokenFromDB(db))
	weigthName.Store(getWeigthNameIfExist())
	GrpcService := &GrpcService{
		db:              db,
		grpcNNClient:    grpcNNClient,
		token:           &token,
		wgExit:          &wgExit,
		trainingNow:     &trainingNow,
		allEpochCount:   &allEpochCount,
		allBatchCount:   &allBatchCount,
		weigthName:      &weigthName,
		downloadInfo:    downloadInfo,
		autolikeInfo:    autoLikeInfo,
		faceDetectIsRun: &faceDetectIsRun}

	checkErr(db.Get(&GrpcService.drawBox, "select draw_box from preferences"))

	grpcServer := grpc.NewServer()
	grpcLibrary.RegisterGrpcServiceServer(grpcServer, GrpcService)
	grpcWebServer := grpcweb.WrapServer(grpcServer)

	fileServer := http.FileServer(http.Dir("./front/dist"))
	mux := http.NewServeMux()
	mux.Handle("/", fileServer)
	mux.Handle("/autoLike", http.StripPrefix("/autoLike", fileServer))
	mux.Handle("/сheck", http.StripPrefix("/сheck", fileServer))
	mux.Handle("/learn", http.StripPrefix("/learn", fileServer))
	mux.Handle("/load", http.StripPrefix("/load", fileServer))
	mux.Handle("/settings", http.StripPrefix("/settings", fileServer))

	handler := h2c.NewHandler(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.ProtoMajor == 2 {
			grpcWebServer.ServeHTTP(w, r)
		} else {
			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, X-User-Agent, X-Grpc-Web")
			if grpcWebServer.IsGrpcWebRequest(r) {
				grpcWebServer.ServeHTTP(w, r)
			} else {
				mux.ServeHTTP(w, r) //comment for debug
			}
		}
	}), &http2.Server{})

	httpServer := &http.Server{
		Addr:    ":8090",
		Handler: handler,
	}
	fmt.Println("Starting server at ", httpServer.Addr)

	go func() {
		if err := httpServer.ListenAndServe(); err != nil {
			fmt.Println("Http Server error: ", err)
		}
	}()
	var appRun atomic.Bool
	appRun.Store(true)
	// go getNewTokenLoop(&wgExit, &appRun, db, &token)
	go PingFaceDetect(&wgExit, grpcNNClient, &appRun, &faceDetectIsRun)
	localIPPORT := getLocalIP() + ":8090"
	fmt.Println("Open browser:", localIPPORT)
	fmt.Println("################## CLOSE APP: CTRL+C ##################")
	time.Sleep(time.Second * 3)
	// openbrowser("http://" + localIPPORT)
	cancelProgram(&wgExit, httpServer, &appRun, downloadInfo, autoLikeInfo, grpcNNClient)
}

func sendRequest(token string, requestURL string) ([]byte, error) {
	client := &http.Client{}
	req, _ := http.NewRequest("GET", requestURL, nil)
	req.Header.Add("X-Auth-Token", token)
	req.Header.Add("platform", "web")
	parseFormErr := req.ParseForm()

	if parseFormErr != nil {
		fmt.Println(parseFormErr)
	}

	resp, err := client.Do(req)

	if err != nil {
		fmt.Println("Failure: ", err, resp.StatusCode)
		return nil, err
	}
	defer resp.Body.Close()
	return ioutil.ReadAll(resp.Body)
}

func getLocalIP() string {
	addrs, err := net.InterfaceAddrs()
	if err != nil {
		return ""
	}
	for _, address := range addrs {
		// check the address type and if it is not a loopback the display it
		if ipnet, ok := address.(*net.IPNet); ok && !ipnet.IP.IsLoopback() {
			if ipnet.IP.To4() != nil {
				return ipnet.IP.String()
			}
		}
	}
	return "localhost"
}

func openbrowser(url string) {
	var err error

	switch runtime.GOOS {
	case "linux":
		err = exec.Command("xdg-open", url).Start()
	case "windows":
		err = exec.Command("rundll32", "url.dll,FileProtocolHandler", url).Start()
	case "darwin":
		err = exec.Command("open", url).Start()
	default:
		err = fmt.Errorf("unsupported platform")
	}
	checkErr(err)

}

// func getNewTokenLoop(wgExit *sync.WaitGroup, appRun *atomic.Bool, db *sqlx.DB, token *atomic.String) {
// 	wgExit.Add(1)
// 	timeToNextToken := 0

// 	for appRun.Load() {
// 		if timeToNextToken > 3600 {
// 			if CheckToken(token.Load()) {
// 				client := &http.Client{}
// 				req, err := http.NewRequest("GET", "https://api.gotinder.com/ws/generate", nil)
// 				req.Header.Add("X-Auth-Token", token.Load())
// 				resp, err := client.Do(req)
// 				if err != nil {
// 					fmt.Println("Failure : ", err)
// 				}
// 				respBody, _ := ioutil.ReadAll(resp.Body)

// 				var tokenMap map[string]json.RawMessage
// 				checkErr(json.Unmarshal(respBody, &tokenMap))
// 				token.Store(strings.Replace(string(tokenMap["token"]), `"`, "", -1))
// 				_, err = db.Exec("update preferences set token = $1", token.Load())
// 				checkErr(err)
// 				fmt.Println("Токен продлён")
// 				fmt.Println(token.Load()) /////
// 			} else {
// 				fmt.Println("Обновите токен, он не актуален")
// 			}
// 			timeToNextToken = 0
// 		} else {
// 			timeToNextToken++
// 		}
// 		time.Sleep(time.Second)
// 		// fmt.Println("up")
// 	}
// 	wgExit.Done()
// }

func getWeigthNameIfExist() string {
	regex, _ := regexp.Compile(`^E(\d+)_VL((\d)[.](\d+))_VA((\d)[.](\d+))\.hdf5$`)
	files, err := ioutil.ReadDir("./resources/NNWeights/")
	if checkErr(err) {
		for _, file := range files {
			if regex.MatchString(file.Name()) {
				return file.Name()
			}
		}
	}
	return ""
}

//  Проверяет валидность токена
func CheckToken(token string) bool {
	data, err := sendRequest(token, "https://api.gotinder.com/v2/profile?include=user")
	if checkErr(err) {
		profileUser := ProfileUser{}
		err = json.Unmarshal(data, &profileUser)
		checkErr(err)
		if profileUser.Meta.Status == 200 {
			return true
		} else {
			return false
		}
	} else {
		return false
	}
}

func PingFaceDetect(wgExit *sync.WaitGroup, grpcNNClient grpcLibrary.GrpcServiceNNClient, appRun *atomic.Bool, faceDetectIsRun *atomic.Bool) {
	wgExit.Add(1)
	for appRun.Load() {
		time.Sleep(time.Second)
		_, err := grpcNNClient.PingNN(context.TODO(), &grpctransport.EmptyMessageNN{})
		faceDetectIsRun.Store(err == nil)
	}
	wgExit.Done()
}

func cancelProgram(wgExit *sync.WaitGroup,
	httpServer *http.Server,
	appRun *atomic.Bool,
	downloadInfo *DownloadInfo,
	autoLikeInfo *AutoLikeInfo,
	grpcNNClient grpcLibrary.GrpcServiceNNClient) {
	sigCh := make(chan os.Signal, 1)
	signal.Notify(sigCh, os.Interrupt)
	for {
		sig := <-sigCh
		switch sig {
		case os.Interrupt:
			downloadInfo.Mutex.Lock()
			downloadInfo.StopDownload = true
			downloadInfo.Mutex.Unlock()
			autoLikeInfo.Mutex.Lock()
			autoLikeInfo.StopAutoLike = true
			autoLikeInfo.Mutex.Unlock()
			appRun.Store(false)
			fmt.Println("Wait for stop")
			wgExit.Wait()

			_, _ = grpcNNClient.ExitApp(context.TODO(), &grpctransport.EmptyMessageNN{})

			fmt.Println("App stopped")
			os.Exit(1)
			// checkErr(httpServer.Shutdown(context.TODO()))

			return
		}
	}

}

// check Возвращает true, если ошибки нет. Возвращает false, если ошибка есть, печатая её в консоль
func checkErr(e error) bool {
	if e != nil {
		fmt.Println("Error: ", e)
		return false
	} else {
		return true
	}
}
