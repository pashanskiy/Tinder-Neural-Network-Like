// package: grpctransport
// file: grpctransport/grpc.proto

var grpctransport_grpc_pb = require("../grpctransport/grpc_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var GrpcService = (function () {
  function GrpcService() {}
  GrpcService.serviceName = "grpctransport.GrpcService";
  return GrpcService;
}());

GrpcService.GetToken = {
  methodName: "GetToken",
  service: GrpcService,
  requestStream: false,
  responseStream: false,
  requestType: grpctransport_grpc_pb.EmptyMessage,
  responseType: grpctransport_grpc_pb.GetTokenResponse
};

GrpcService.SetToken = {
  methodName: "SetToken",
  service: GrpcService,
  requestStream: false,
  responseStream: false,
  requestType: grpctransport_grpc_pb.SetTokenRequest,
  responseType: grpctransport_grpc_pb.SetTokenResponse
};

GrpcService.GetDownloadedInfoFromDB = {
  methodName: "GetDownloadedInfoFromDB",
  service: GrpcService,
  requestStream: false,
  responseStream: false,
  requestType: grpctransport_grpc_pb.EmptyMessage,
  responseType: grpctransport_grpc_pb.GetDownloadInfoFromDBResponse
};

GrpcService.GetUsers = {
  methodName: "GetUsers",
  service: GrpcService,
  requestStream: false,
  responseStream: false,
  requestType: grpctransport_grpc_pb.GetUsersRequest,
  responseType: grpctransport_grpc_pb.GetUsersResponse
};

GrpcService.LikeDislike = {
  methodName: "LikeDislike",
  service: GrpcService,
  requestStream: false,
  responseStream: false,
  requestType: grpctransport_grpc_pb.LikeDislikeRequest,
  responseType: grpctransport_grpc_pb.EmptyMessage
};

GrpcService.SetDownloadPhotos = {
  methodName: "SetDownloadPhotos",
  service: GrpcService,
  requestStream: false,
  responseStream: false,
  requestType: grpctransport_grpc_pb.SetDownloadPhotosRequest,
  responseType: grpctransport_grpc_pb.SetDownloadPhotosResponse
};

GrpcService.StopDownload = {
  methodName: "StopDownload",
  service: GrpcService,
  requestStream: false,
  responseStream: false,
  requestType: grpctransport_grpc_pb.EmptyMessage,
  responseType: grpctransport_grpc_pb.EmptyMessage
};

GrpcService.DrawBox = {
  methodName: "DrawBox",
  service: GrpcService,
  requestStream: false,
  responseStream: false,
  requestType: grpctransport_grpc_pb.DrawBoxRequest,
  responseType: grpctransport_grpc_pb.TrueFalse
};

GrpcService.PassOrIgnore = {
  methodName: "PassOrIgnore",
  service: GrpcService,
  requestStream: false,
  responseStream: false,
  requestType: grpctransport_grpc_pb.PassOrIgnoreRequest,
  responseType: grpctransport_grpc_pb.PassOrIgnoreResponse
};

GrpcService.PredictUser = {
  methodName: "PredictUser",
  service: GrpcService,
  requestStream: false,
  responseStream: false,
  requestType: grpctransport_grpc_pb.PredictUserRequest,
  responseType: grpctransport_grpc_pb.PredictUserResponse
};

GrpcService.DeleteLastLikes = {
  methodName: "DeleteLastLikes",
  service: GrpcService,
  requestStream: false,
  responseStream: false,
  requestType: grpctransport_grpc_pb.SetLikeToNullLastNUsers,
  responseType: grpctransport_grpc_pb.EmptyMessage
};

GrpcService.GetPossibilityDeleteLastLikes = {
  methodName: "GetPossibilityDeleteLastLikes",
  service: GrpcService,
  requestStream: false,
  responseStream: false,
  requestType: grpctransport_grpc_pb.SetLikeToNullLastNUsers,
  responseType: grpctransport_grpc_pb.PossibilityDeleteLastLikes
};

GrpcService.DeleteAllLikes = {
  methodName: "DeleteAllLikes",
  service: GrpcService,
  requestStream: false,
  responseStream: false,
  requestType: grpctransport_grpc_pb.EmptyMessage,
  responseType: grpctransport_grpc_pb.EmptyMessage
};

GrpcService.PermanentlyDeleteAllInfo = {
  methodName: "PermanentlyDeleteAllInfo",
  service: GrpcService,
  requestStream: false,
  responseStream: false,
  requestType: grpctransport_grpc_pb.EmptyMessage,
  responseType: grpctransport_grpc_pb.EmptyMessage
};

GrpcService.LikeDislikeCountPhotosFromDB = {
  methodName: "LikeDislikeCountPhotosFromDB",
  service: GrpcService,
  requestStream: false,
  responseStream: false,
  requestType: grpctransport_grpc_pb.EmptyMessage,
  responseType: grpctransport_grpc_pb.LikeDislikeCountPhotosFromDBResponse
};

GrpcService.GetTokenTutorial = {
  methodName: "GetTokenTutorial",
  service: GrpcService,
  requestStream: false,
  responseStream: false,
  requestType: grpctransport_grpc_pb.EmptyMessage,
  responseType: grpctransport_grpc_pb.GetTokenTutorialResponse
};

GrpcService.StartTrain = {
  methodName: "StartTrain",
  service: GrpcService,
  requestStream: false,
  responseStream: false,
  requestType: grpctransport_grpc_pb.TrainRequest,
  responseType: grpctransport_grpc_pb.TrainResponse
};

GrpcService.GetTrainingNow = {
  methodName: "GetTrainingNow",
  service: GrpcService,
  requestStream: false,
  responseStream: false,
  requestType: grpctransport_grpc_pb.EmptyMessage,
  responseType: grpctransport_grpc_pb.TrainResponse
};

GrpcService.GetWeigthName = {
  methodName: "GetWeigthName",
  service: GrpcService,
  requestStream: false,
  responseStream: false,
  requestType: grpctransport_grpc_pb.EmptyMessage,
  responseType: grpctransport_grpc_pb.GetWeigthNameResponse
};

GrpcService.RunAutoLike = {
  methodName: "RunAutoLike",
  service: GrpcService,
  requestStream: false,
  responseStream: false,
  requestType: grpctransport_grpc_pb.EmptyMessage,
  responseType: grpctransport_grpc_pb.EmptyMessage
};

GrpcService.StopAutoLike = {
  methodName: "StopAutoLike",
  service: GrpcService,
  requestStream: false,
  responseStream: false,
  requestType: grpctransport_grpc_pb.EmptyMessage,
  responseType: grpctransport_grpc_pb.EmptyMessage
};

GrpcService.GetAutoLikeIsRun = {
  methodName: "GetAutoLikeIsRun",
  service: GrpcService,
  requestStream: false,
  responseStream: false,
  requestType: grpctransport_grpc_pb.EmptyMessage,
  responseType: grpctransport_grpc_pb.GetAutoLikeIsRunResponse
};

GrpcService.StreamingDownloadInfo = {
  methodName: "StreamingDownloadInfo",
  service: GrpcService,
  requestStream: false,
  responseStream: true,
  requestType: grpctransport_grpc_pb.EmptyMessage,
  responseType: grpctransport_grpc_pb.DownloadInfoResponse
};

GrpcService.StreamingGetFaceDetectRunInfo = {
  methodName: "StreamingGetFaceDetectRunInfo",
  service: GrpcService,
  requestStream: false,
  responseStream: true,
  requestType: grpctransport_grpc_pb.EmptyMessage,
  responseType: grpctransport_grpc_pb.GetFaceDetectRunInfoResponse
};

GrpcService.StreamingGetLoadingPhotos = {
  methodName: "StreamingGetLoadingPhotos",
  service: GrpcService,
  requestStream: false,
  responseStream: true,
  requestType: grpctransport_grpc_pb.EmptyMessage,
  responseType: grpctransport_grpc_pb.GetLoadingPhotosResponse
};

GrpcService.StreamingTrainStatus = {
  methodName: "StreamingTrainStatus",
  service: GrpcService,
  requestStream: false,
  responseStream: true,
  requestType: grpctransport_grpc_pb.EmptyMessage,
  responseType: grpctransport_grpc_pb.FitStatusResponse
};

GrpcService.StreamingAutoLike = {
  methodName: "StreamingAutoLike",
  service: GrpcService,
  requestStream: false,
  responseStream: true,
  requestType: grpctransport_grpc_pb.EmptyMessage,
  responseType: grpctransport_grpc_pb.AutoLikeResponse
};

exports.GrpcService = GrpcService;

function GrpcServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

GrpcServiceClient.prototype.getToken = function getToken(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(GrpcService.GetToken, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

GrpcServiceClient.prototype.setToken = function setToken(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(GrpcService.SetToken, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

GrpcServiceClient.prototype.getDownloadedInfoFromDB = function getDownloadedInfoFromDB(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(GrpcService.GetDownloadedInfoFromDB, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

GrpcServiceClient.prototype.getUsers = function getUsers(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(GrpcService.GetUsers, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

GrpcServiceClient.prototype.likeDislike = function likeDislike(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(GrpcService.LikeDislike, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

GrpcServiceClient.prototype.setDownloadPhotos = function setDownloadPhotos(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(GrpcService.SetDownloadPhotos, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

GrpcServiceClient.prototype.stopDownload = function stopDownload(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(GrpcService.StopDownload, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

GrpcServiceClient.prototype.drawBox = function drawBox(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(GrpcService.DrawBox, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

GrpcServiceClient.prototype.passOrIgnore = function passOrIgnore(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(GrpcService.PassOrIgnore, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

GrpcServiceClient.prototype.predictUser = function predictUser(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(GrpcService.PredictUser, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

GrpcServiceClient.prototype.deleteLastLikes = function deleteLastLikes(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(GrpcService.DeleteLastLikes, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

GrpcServiceClient.prototype.getPossibilityDeleteLastLikes = function getPossibilityDeleteLastLikes(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(GrpcService.GetPossibilityDeleteLastLikes, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

GrpcServiceClient.prototype.deleteAllLikes = function deleteAllLikes(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(GrpcService.DeleteAllLikes, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

GrpcServiceClient.prototype.permanentlyDeleteAllInfo = function permanentlyDeleteAllInfo(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(GrpcService.PermanentlyDeleteAllInfo, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

GrpcServiceClient.prototype.likeDislikeCountPhotosFromDB = function likeDislikeCountPhotosFromDB(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(GrpcService.LikeDislikeCountPhotosFromDB, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

GrpcServiceClient.prototype.getTokenTutorial = function getTokenTutorial(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(GrpcService.GetTokenTutorial, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

GrpcServiceClient.prototype.startTrain = function startTrain(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(GrpcService.StartTrain, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

GrpcServiceClient.prototype.getTrainingNow = function getTrainingNow(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(GrpcService.GetTrainingNow, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

GrpcServiceClient.prototype.getWeigthName = function getWeigthName(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(GrpcService.GetWeigthName, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

GrpcServiceClient.prototype.runAutoLike = function runAutoLike(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(GrpcService.RunAutoLike, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

GrpcServiceClient.prototype.stopAutoLike = function stopAutoLike(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(GrpcService.StopAutoLike, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

GrpcServiceClient.prototype.getAutoLikeIsRun = function getAutoLikeIsRun(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(GrpcService.GetAutoLikeIsRun, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

GrpcServiceClient.prototype.streamingDownloadInfo = function streamingDownloadInfo(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(GrpcService.StreamingDownloadInfo, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

GrpcServiceClient.prototype.streamingGetFaceDetectRunInfo = function streamingGetFaceDetectRunInfo(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(GrpcService.StreamingGetFaceDetectRunInfo, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

GrpcServiceClient.prototype.streamingGetLoadingPhotos = function streamingGetLoadingPhotos(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(GrpcService.StreamingGetLoadingPhotos, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

GrpcServiceClient.prototype.streamingTrainStatus = function streamingTrainStatus(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(GrpcService.StreamingTrainStatus, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

GrpcServiceClient.prototype.streamingAutoLike = function streamingAutoLike(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(GrpcService.StreamingAutoLike, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

exports.GrpcServiceClient = GrpcServiceClient;

