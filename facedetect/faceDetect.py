from threading import Thread
import time
import io, os, re
import matplotlib.image as mpimg
import numpy as np
from PIL import Image
from mtcnn.mtcnn import MTCNN
from concurrent import futures
import grpc
import grpctransport.grpcnn_pb2 as grpcnn
import grpctransport.grpcnn_pb2_grpc as grpcnnService
import tensorflow as tf
from tensorflow.keras import layers, models, optimizers

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

seconds_without_ping = 0

epoch_status = 0
batch_status = 0
batch_count = 0

class GrpcServiceNN(grpcnnService.GrpcServiceNNServicer):

  def __init__(self):
    self.train_epoch = 5
    self.train_batch = 32
    self.detector = MTCNN()
    self.cutBackgroundModel = tf.compat.v1.keras.models.load_model("./models/cutBackground_deconv_bnoptimized_munet.h5", compile=False)
    self.validationModel = tf.keras.models.load_model('./models/validation_E188_L0.2642_A0.8981.pb', compile=False)
    self.likeDislikeModel = compileModelAdam(createModel())
    self.likeDislikeModel = loadWeigths(self.likeDislikeModel, True)
    
  def PingNN(self, request, context):
    global seconds_without_ping
    seconds_without_ping = 0
    return grpcnn.EmptyMessageNN()
  
  def GetFace(self, request, context):
    img = mpimg.imread(io.BytesIO(request.PhotoBytes), format='jpeg')
    faces = self.detector.detect_faces(img)
    getFaceResponse = grpcnn.GetFaceResponse()
    getFaceResponse.PhotoId = request.PhotoId
    for face in faces:
      faceGrpc = grpcnn.Face()
      faceGrpc.X = face['box'][0]
      faceGrpc.Y = face['box'][1]
      faceGrpc.Width = face['box'][2]
      faceGrpc.Height = face['box'][3]
      faceGrpc.NoseX = face['keypoints']['nose'][0]
      faceGrpc.NoseY = face['keypoints']['nose'][1]
      faceGrpc.LeftEyeX = face['keypoints']['left_eye'][0]
      faceGrpc.LeftEyeY = face['keypoints']['left_eye'][1]
      faceGrpc.RightEyeX = face['keypoints']['right_eye'][0]
      faceGrpc.RightEyeY = face['keypoints']['right_eye'][1]
      faceGrpc.MouthLeftX = face['keypoints']['mouth_left'][0]
      faceGrpc.MouthLeftY = face['keypoints']['mouth_left'][1]
      faceGrpc.MouthRightX = face['keypoints']['mouth_right'][0]
      faceGrpc.MouthRightY = face['keypoints']['mouth_right'][1]
      faceGrpc.Confidence = face['confidence']
      getFaceResponse.Faces.append(faceGrpc)
    print("")
    print("Photo ID: ", request.PhotoId)
    for index, face in enumerate(getFaceResponse.Faces):
      print(" Face ", index + 1)
      print("  X: ", face.X)
      print("  Y: ", face.Y)
      print("  W: ", face.Width)
      print("  H: ", face.Height)
    return getFaceResponse

  def LoadWeigths(self, request, context):
    self.likeDislikeModel = loadWeigths(self.likeDislikeModel, False)
    return grpcnn.EmptyMessageNN()
     
  def FitAllToModel(self, request, context):
    global epoch_status
    global batch_status
    global batch_count
    self.train_epoch = request.CountOfEpochs
    batch_count = int(len(request.PhotoNameLike) / self.train_batch)
    epoch_status = 0
    batch_status = 0
    images_to_model = []
    labels_to_model = []
    for photo_name_like in request.PhotoNameLike:
      images_to_model.append(tf.io.decode_jpeg(tf.io.read_file("../resources/NNFace/" + photo_name_like.PhotoName)))
      if photo_name_like.Like == True:
        labels_to_model.append(tf.constant(0))
      else:
        labels_to_model.append(tf.constant(1))
    train_dataset = tf.data.Dataset.from_tensor_slices((images_to_model, labels_to_model))
    images_to_model = []
    labels_to_model = []
    for photo_name_like in request.PhotoNameLikeValidate:
      images_to_model.append(tf.io.decode_jpeg(tf.io.read_file("../resources/NNFace/" + photo_name_like.PhotoName)))
      if photo_name_like.Like == True:
        labels_to_model.append(tf.constant(0))
      else:
        labels_to_model.append(tf.constant(1))
    val_dataset = tf.data.Dataset.from_tensor_slices((images_to_model, labels_to_model))
    train_dataset = train_dataset.batch(self.train_batch)
    val_dataset = val_dataset.batch(self.train_batch)
    self.likeDislikeModel = compileModelAdam(createModel())
    save_checkpoint = tf.keras.callbacks.ModelCheckpoint(
      filepath="../resources/NNWeights/E{epoch:02d}_VL{val_loss:.4f}_VA{val_accuracy:.4f}.hdf5", 
      verbose=1,
      monitor="val_accuracy",
      mode="max",
      save_weights_only=True,
      save_best_only=False,
      save_freq = "epoch")
    print("Train DS Len:", len(train_dataset))
    print("Val   DS Len:", len(val_dataset))
    self.likeDislikeModel.fit(train_dataset, validation_data=val_dataset, epochs=self.train_epoch, callbacks=[KekCallback(), save_checkpoint])
    return grpcnn.EmptyMessageNN()

  def GetStatusOfFit(self, request, context):
    fitStatusResponseNN = grpcnn.FitStatusResponseNN()
    fitStatusResponseNN.Epoch = epoch_status
    fitStatusResponseNN.Batch = batch_status
    return fitStatusResponseNN

  def PredictFromBytes(self, request, context):
    predictResponse = grpcnn.PhotosToModelResponse()
    predictResponse.UserId = request.UserId
    predict_images = []
    for photoBytes in request.PhotosBytes:
      predict_images.append(tf.io.decode_jpeg(photoBytes))
    modelPredict(self.likeDislikeModel, predict_images, predictResponse)
    return predictResponse

  def CutBackgroundAndValidFace(self, request, context):
    decodedPhoto = np.float32(np.array(Image.open(io.BytesIO(request.PhotoBytes)))/255.0)
    cutBackgroundPhotoArray = np.float32((self.cutBackgroundModel.predict(decodedPhoto.reshape(1,128,128,3))>0.5)).reshape(128,128,1)
    cutBackgroundPhoto = Image.fromarray(np.array(Image.fromarray((cutBackgroundPhotoArray*decodedPhoto * 255).astype(np.uint8)).resize((128, 128)).convert('L')))
    response = grpcnn.CutBackgroundAndValidFaceResponse()
    img_byte_arr = io.BytesIO()
    cutBackgroundPhoto.save(img_byte_arr, format='JPEG')
    response.PhotoBytes = img_byte_arr.getvalue()
    response.Valid = self.validationModel.predict(tf.expand_dims(cutBackgroundPhoto, 0))[0]
    # Image.fromarray(np.array(Image.fromarray((cutBackgroundPhotoArray*decodedPhoto * 255).astype(np.uint8)).resize((128, 128)))).save("/kek/Downloads/kekPhotos/kek/bw_"+str(response.Valid)+".jpg", format='JPEG')
    # cutBackgroundPhoto.save("/kek/Downloads/kekPhotos/kek/wob_"+str(response.Valid)+".jpg", format='JPEG')
    return response
  
  def ExitApp(self, request, context):
      print("Exit: TNNL is stopped")
      os._exit(0)

class KekCallback(tf.keras.callbacks.Callback):
  def on_epoch_end(self, epoch, logs=None):
      global epoch_status 
      epoch_status = epoch + 1
  def on_train_batch_end(self, batch, logs=None):
      global batch_status
      batch_status = batch + 1

def createModel():
  img_bounds = 128
  model = models.Sequential()
  model.add(layers.ZeroPadding2D(padding=1, input_shape=(img_bounds, img_bounds, 1)))
  model.add(layers.Conv2D(24, 3, activation='relu'))
  model.add(layers.BatchNormalization())
  model.add(layers.AveragePooling2D((2, 2)))
  model.add(layers.Dropout(0.3))

  model.add(layers.ZeroPadding2D(padding=1))
  model.add(layers.Conv2D(20, 3, activation='relu'))
  model.add(layers.BatchNormalization())
  model.add(layers.Dropout(0.35))

  model.add(layers.ZeroPadding2D(padding=1))
  model.add(layers.Conv2D(16, 3, activation='relu'))
  model.add(layers.BatchNormalization())
  model.add(layers.AveragePooling2D((2, 2)))
  model.add(layers.Dropout(0.4))

  model.add(layers.ZeroPadding2D(padding=1))
  model.add(layers.Conv2D(12, 3, activation='relu'))
  model.add(layers.BatchNormalization())
  model.add(layers.Dropout(0.45))

  model.add(layers.ZeroPadding2D(padding=1))
  model.add(layers.Conv2D(8, 3, activation='relu'))
  model.add(layers.BatchNormalization())
  model.add(layers.AveragePooling2D((2, 2)))
  model.add(layers.Dropout(0.5))

  model.add(layers.Flatten())
  model.add(layers.BatchNormalization())
  model.add(layers.Dense(256, activation='relu'))
  model.add(layers.Dropout(0.5))
  model.add(layers.Dense(256, activation='relu'))
  model.add(layers.Dropout(0.5))
  model.add(layers.Dense(1, activation='sigmoid'))
  return model

def compileModelAdam(model):
  adam = optimizers.Adam(learning_rate=0.0005)
  model.compile(optimizer=adam,
            loss='binary_crossentropy',
            metrics=['accuracy'])
  return model

def get_weigth():
  regex = re.compile('^E(\d+)_VL((\d)[.](\d+))_VA((\d)[.](\d+))\.hdf5$')
  files = os.listdir("../resources/NNWeights/")
  for file in files:
    result = regex.findall(file)
    if len(result) == 1:
      return file

def loadWeigths(model, firstLoad: bool):
  try:
    latest_weight = "../resources/NNWeights/" + get_weigth()
    model.load_weights(latest_weight)
    print( "Weight load:", latest_weight)
  except: 
    if firstLoad == False:
      model = compileModelAdam(createModel())
    print("Weigths does not exist: model is empty")
  return model

def modelPredict(model, img_array, predictResponse):
  predict_dataset = tf.data.Dataset.from_tensor_slices(img_array)
  predict_dataset = predict_dataset.batch(1)
  predictions = model.predict(predict_dataset)
  for prediction in predictions:
    predictResponse.PredictLikeDislike.append(prediction)
  return predictResponse

def exit_if_no_ping():
  global seconds_without_ping
  while True:
    time.sleep(1)
    seconds_without_ping += 1

    if seconds_without_ping > 60:
      print("Exit: TNNL is don't run")
      os._exit(0)
    if seconds_without_ping > 20:
      print("Ping to TNNL fail:", seconds_without_ping, "/ 60")

def serve():
  ipPort = '[::]:8091'
  grpcServer = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
  grpcnnService.add_GrpcServiceNNServicer_to_server(GrpcServiceNN(), grpcServer)
  grpcServer.add_insecure_port(ipPort)
  grpcServer.start()
  print("GRPC server start on: ", ipPort)
  grpcServer.wait_for_termination()
  

print("Face Detect v0.2 by Pashanskiy")
thread = Thread(target = exit_if_no_ping)
thread.start()

serve()