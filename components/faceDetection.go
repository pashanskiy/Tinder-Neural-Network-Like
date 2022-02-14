package components

import (
	"bytes"
	"errors"
	"fmt"
	"image"
	"image/color"
	"image/jpeg"
	"math"

	"github.com/disintegration/imaging"
	"github.com/pashanskiy/tnn/components/grpctransport"
	"github.com/pbnjay/pixfont"
	"golang.org/x/image/draw"
	"golang.org/x/image/webp"
)

func HLine(x1, y, x2 int, img *image.RGBA) {
	for ; x1 <= x2; x1++ {
		img.Set(x1, y, color.RGBA{0, 255, 0, 255})
	}
}

func VLine(x, y1, y2 int, img *image.RGBA) {
	for ; y1 <= y2; y1++ {
		img.Set(x, y1, color.RGBA{0, 255, 0, 255})
	}
}

func Rect(x1, y1, x2, y2 int, img *image.RGBA) {
	HLine(x1, y1, x2, img)
	HLine(x1, y2, x2, img)
	VLine(x1, y1, y2, img)
	VLine(x2, y1, y2, img)
}

// рисует зеленый прямоугольник распозанной области (лица)
func DrawImageBoxToPhoto(photoBytes []byte, ext string, faces interface{}) ([]byte, error) {
	var facesBox []faceBox
	switch f := faces.(type) {
	case *grpctransport.GetFaceResponse:
		for _, face := range f.Faces {
			facesBox = append(facesBox, faceBox{
				X:          int(face.X),
				Y:          int(face.Y),
				Width:      int(face.Width),
				Height:     int(face.Height),
				Confidence: face.Confidence,
			})
		}
	case []faceBox:
		facesBox = f
	default:
		return nil, errors.New("Type error")
	}
	srcimg, err := decodePhoto(photoBytes, ext)
	if srcimg != nil {
		b := srcimg.Bounds()
		image := *image.NewRGBA(image.Rect(0, 0, b.Dx(), b.Dy()))
		draw.Draw(&image, image.Bounds(), srcimg, b.Min, draw.Src)
		srcimg = nil
		for _, face := range facesBox {
			faceX1 := int(face.X)
			faceY1 := int(face.Y)
			faceX2 := int(face.X + face.Width)
			faceY2 := int(face.Y + face.Height)
			Rect(faceX1, faceY1, faceX2, faceY2, &image)
			pixfont.DrawString(&image, faceX1+5, faceY2+5, "face: "+fmt.Sprintf("%f", face.Confidence), color.RGBA{0, 255, 0, 255})
		}

		drawedPhotoBytes := new(bytes.Buffer)
		checkErr(jpeg.Encode(drawedPhotoBytes, &image, &jpeg.Options{Quality: 55}))
		return drawedPhotoBytes.Bytes(), nil
	}
	return nil, err
}

func decodePhoto(photoBytes []byte, ext string) (image.Image, error) {
	var srcimg image.Image
	var err error
	switch ext {
	case "jpg":
		srcimg, _, err = image.Decode(bytes.NewReader(photoBytes))
		if err != nil {
			err = errors.New("Error: jpg decode unknown format (facedetect.go, DrawImageBoxToPhoto)")
		}
	case "webp":
		srcimg, err = webp.Decode(bytes.NewReader(photoBytes))
		if err != nil {
			err = errors.New("Error: webp decode unknown format (facedetect.go, DrawImageBoxToPhoto)")
		}
	default:
		err = errors.New("Error: decode unknown format (facedetect.go, DrawImageBoxToPhoto)")
	}

	return srcimg, err
}

func convertImageToRGBA(img image.Image) *image.RGBA {
	imgBounds := img.Bounds()
	imageRGBA := image.NewRGBA(image.Rect(0, 0, imgBounds.Dx(), imgBounds.Dy()))
	draw.Draw(imageRGBA, imageRGBA.Bounds(), img, imgBounds.Min, draw.Src)
	img = nil
	return imageRGBA
}

// Вырез и поворот лица из картинки
func RotateAndCutFace(face *grpctransport.Face, photoImage *image.RGBA) []byte {
	scalePX := 128
	var bigSide int
	if face.Width < face.Height {
		bigSide = int(face.Height)
	} else {
		bigSide = int(face.Width)
	}
	bigSide += bigSide / 100 * 30
	var radianAngle float64
	if face.MouthLeftY < face.MouthRightY {
		radianAngle = math.Atan(float64(face.MouthRightY-face.MouthLeftY) / float64(face.MouthRightX-face.MouthLeftX))
	} else {
		radianAngle = -math.Atan(float64(face.MouthLeftY-face.MouthRightY) / float64(face.MouthRightX-face.MouthLeftX))
	}
	imgR := imaging.Rotate(photoImage, radianAngle*(180/3.14159265359), color.Black)
	imgOCenterX := photoImage.Rect.Max.X / 2
	imgOCenterY := photoImage.Rect.Max.Y / 2
	imgRCenterX := imgR.Rect.Max.X / 2
	imgRCenterY := imgR.Rect.Max.Y / 2
	img := image.NewRGBA(image.Rect(0, 0, bigSide, bigSide))

	var diffF image.Point
	if bigSide == int(face.Width)/100*30 {
		diffF.X = int(face.X) + bigSide/2
		diffF.Y = int(face.Y) - (bigSide-int(face.Height))/2 + bigSide/2
	} else {
		diffF.X = int(face.X) - (bigSide-int(face.Width))/2 + bigSide/2
		diffF.Y = int(face.Y) + bigSide/2
	}
	diffF.Y -= bigSide / 100 * 30 / 2

	originalImgFaceSquareAngle := math.Atan2(float64(diffF.Y-imgOCenterY)+0.5, float64(diffF.X-imgOCenterX)+0.5)
	radius := math.Sqrt(math.Pow(float64(diffF.X-photoImage.Rect.Max.X/2), 2) + math.Pow(float64(diffF.Y-photoImage.Rect.Max.Y/2), 2))
	var diffF3 image.Point
	diffF3.X = int(radius*math.Cos(originalImgFaceSquareAngle-radianAngle)) + imgRCenterX - bigSide/2
	diffF3.Y = int(radius*math.Sin(originalImgFaceSquareAngle-radianAngle)) + imgRCenterY - bigSide/2
	draw.Draw(img, img.Rect, imgR, diffF3, draw.Src)
	dst := image.NewRGBA(image.Rect(0, 0, scalePX, scalePX))
	draw.NearestNeighbor.Scale(dst, dst.Rect, img, img.Bounds(), draw.Over, nil)
	img = nil
	bufferPhotoBytes := new(bytes.Buffer)
	err := jpeg.Encode(bufferPhotoBytes, dst, &jpeg.Options{Quality: 100})
	checkErr(err)
	return bufferPhotoBytes.Bytes()
}

// возвращает Like и Dislike
func BinaryToLikeDislike(predict *grpctransport.PhotosToModelResponse) (float32, float32) {
	if predict != nil {
		var likeDislikePercent float32
		for _, predictPhoto := range predict.PredictLikeDislike {
			likeDislikePercent += predictPhoto
		}
		likeDislikePercent /= float32(len(predict.PredictLikeDislike))
		return (1.0 - likeDislikePercent) * 100, likeDislikePercent * 100
	}
	return 0, 0
}
