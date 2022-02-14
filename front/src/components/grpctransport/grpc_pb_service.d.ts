// package: grpctransport
// file: grpctransport/grpc.proto

import * as grpctransport_grpc_pb from "../grpctransport/grpc_pb";
import {grpc} from "@improbable-eng/grpc-web";

type GrpcServiceGetToken = {
  readonly methodName: string;
  readonly service: typeof GrpcService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof grpctransport_grpc_pb.EmptyMessage;
  readonly responseType: typeof grpctransport_grpc_pb.GetTokenResponse;
};

type GrpcServiceSetToken = {
  readonly methodName: string;
  readonly service: typeof GrpcService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof grpctransport_grpc_pb.SetTokenRequest;
  readonly responseType: typeof grpctransport_grpc_pb.SetTokenResponse;
};

type GrpcServiceGetDownloadedInfoFromDB = {
  readonly methodName: string;
  readonly service: typeof GrpcService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof grpctransport_grpc_pb.EmptyMessage;
  readonly responseType: typeof grpctransport_grpc_pb.GetDownloadInfoFromDBResponse;
};

type GrpcServiceGetUsers = {
  readonly methodName: string;
  readonly service: typeof GrpcService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof grpctransport_grpc_pb.GetUsersRequest;
  readonly responseType: typeof grpctransport_grpc_pb.GetUsersResponse;
};

type GrpcServiceLikeDislike = {
  readonly methodName: string;
  readonly service: typeof GrpcService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof grpctransport_grpc_pb.LikeDislikeRequest;
  readonly responseType: typeof grpctransport_grpc_pb.EmptyMessage;
};

type GrpcServiceSetDownloadPhotos = {
  readonly methodName: string;
  readonly service: typeof GrpcService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof grpctransport_grpc_pb.SetDownloadPhotosRequest;
  readonly responseType: typeof grpctransport_grpc_pb.SetDownloadPhotosResponse;
};

type GrpcServiceStopDownload = {
  readonly methodName: string;
  readonly service: typeof GrpcService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof grpctransport_grpc_pb.EmptyMessage;
  readonly responseType: typeof grpctransport_grpc_pb.EmptyMessage;
};

type GrpcServiceDrawBox = {
  readonly methodName: string;
  readonly service: typeof GrpcService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof grpctransport_grpc_pb.DrawBoxRequest;
  readonly responseType: typeof grpctransport_grpc_pb.TrueFalse;
};

type GrpcServicePassOrIgnore = {
  readonly methodName: string;
  readonly service: typeof GrpcService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof grpctransport_grpc_pb.PassOrIgnoreRequest;
  readonly responseType: typeof grpctransport_grpc_pb.PassOrIgnoreResponse;
};

type GrpcServicePredictUser = {
  readonly methodName: string;
  readonly service: typeof GrpcService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof grpctransport_grpc_pb.PredictUserRequest;
  readonly responseType: typeof grpctransport_grpc_pb.PredictUserResponse;
};

type GrpcServiceDeleteLastLikes = {
  readonly methodName: string;
  readonly service: typeof GrpcService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof grpctransport_grpc_pb.SetLikeToNullLastNUsers;
  readonly responseType: typeof grpctransport_grpc_pb.EmptyMessage;
};

type GrpcServiceGetPossibilityDeleteLastLikes = {
  readonly methodName: string;
  readonly service: typeof GrpcService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof grpctransport_grpc_pb.SetLikeToNullLastNUsers;
  readonly responseType: typeof grpctransport_grpc_pb.PossibilityDeleteLastLikes;
};

type GrpcServiceDeleteAllLikes = {
  readonly methodName: string;
  readonly service: typeof GrpcService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof grpctransport_grpc_pb.EmptyMessage;
  readonly responseType: typeof grpctransport_grpc_pb.EmptyMessage;
};

type GrpcServicePermanentlyDeleteAllInfo = {
  readonly methodName: string;
  readonly service: typeof GrpcService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof grpctransport_grpc_pb.EmptyMessage;
  readonly responseType: typeof grpctransport_grpc_pb.EmptyMessage;
};

type GrpcServiceLikeDislikeCountPhotosFromDB = {
  readonly methodName: string;
  readonly service: typeof GrpcService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof grpctransport_grpc_pb.EmptyMessage;
  readonly responseType: typeof grpctransport_grpc_pb.LikeDislikeCountPhotosFromDBResponse;
};

type GrpcServiceGetTokenTutorial = {
  readonly methodName: string;
  readonly service: typeof GrpcService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof grpctransport_grpc_pb.EmptyMessage;
  readonly responseType: typeof grpctransport_grpc_pb.GetTokenTutorialResponse;
};

type GrpcServiceStartTrain = {
  readonly methodName: string;
  readonly service: typeof GrpcService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof grpctransport_grpc_pb.TrainRequest;
  readonly responseType: typeof grpctransport_grpc_pb.TrainResponse;
};

type GrpcServiceGetTrainingNow = {
  readonly methodName: string;
  readonly service: typeof GrpcService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof grpctransport_grpc_pb.EmptyMessage;
  readonly responseType: typeof grpctransport_grpc_pb.TrainResponse;
};

type GrpcServiceGetWeigthName = {
  readonly methodName: string;
  readonly service: typeof GrpcService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof grpctransport_grpc_pb.EmptyMessage;
  readonly responseType: typeof grpctransport_grpc_pb.GetWeigthNameResponse;
};

type GrpcServiceRunAutoLike = {
  readonly methodName: string;
  readonly service: typeof GrpcService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof grpctransport_grpc_pb.EmptyMessage;
  readonly responseType: typeof grpctransport_grpc_pb.EmptyMessage;
};

type GrpcServiceStopAutoLike = {
  readonly methodName: string;
  readonly service: typeof GrpcService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof grpctransport_grpc_pb.EmptyMessage;
  readonly responseType: typeof grpctransport_grpc_pb.EmptyMessage;
};

type GrpcServiceGetAutoLikeIsRun = {
  readonly methodName: string;
  readonly service: typeof GrpcService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof grpctransport_grpc_pb.EmptyMessage;
  readonly responseType: typeof grpctransport_grpc_pb.GetAutoLikeIsRunResponse;
};

type GrpcServiceStreamingDownloadInfo = {
  readonly methodName: string;
  readonly service: typeof GrpcService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof grpctransport_grpc_pb.EmptyMessage;
  readonly responseType: typeof grpctransport_grpc_pb.DownloadInfoResponse;
};

type GrpcServiceStreamingGetFaceDetectRunInfo = {
  readonly methodName: string;
  readonly service: typeof GrpcService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof grpctransport_grpc_pb.EmptyMessage;
  readonly responseType: typeof grpctransport_grpc_pb.GetFaceDetectRunInfoResponse;
};

type GrpcServiceStreamingGetLoadingPhotos = {
  readonly methodName: string;
  readonly service: typeof GrpcService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof grpctransport_grpc_pb.EmptyMessage;
  readonly responseType: typeof grpctransport_grpc_pb.GetLoadingPhotosResponse;
};

type GrpcServiceStreamingTrainStatus = {
  readonly methodName: string;
  readonly service: typeof GrpcService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof grpctransport_grpc_pb.EmptyMessage;
  readonly responseType: typeof grpctransport_grpc_pb.FitStatusResponse;
};

type GrpcServiceStreamingAutoLike = {
  readonly methodName: string;
  readonly service: typeof GrpcService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof grpctransport_grpc_pb.EmptyMessage;
  readonly responseType: typeof grpctransport_grpc_pb.AutoLikeResponse;
};

export class GrpcService {
  static readonly serviceName: string;
  static readonly GetToken: GrpcServiceGetToken;
  static readonly SetToken: GrpcServiceSetToken;
  static readonly GetDownloadedInfoFromDB: GrpcServiceGetDownloadedInfoFromDB;
  static readonly GetUsers: GrpcServiceGetUsers;
  static readonly LikeDislike: GrpcServiceLikeDislike;
  static readonly SetDownloadPhotos: GrpcServiceSetDownloadPhotos;
  static readonly StopDownload: GrpcServiceStopDownload;
  static readonly DrawBox: GrpcServiceDrawBox;
  static readonly PassOrIgnore: GrpcServicePassOrIgnore;
  static readonly PredictUser: GrpcServicePredictUser;
  static readonly DeleteLastLikes: GrpcServiceDeleteLastLikes;
  static readonly GetPossibilityDeleteLastLikes: GrpcServiceGetPossibilityDeleteLastLikes;
  static readonly DeleteAllLikes: GrpcServiceDeleteAllLikes;
  static readonly PermanentlyDeleteAllInfo: GrpcServicePermanentlyDeleteAllInfo;
  static readonly LikeDislikeCountPhotosFromDB: GrpcServiceLikeDislikeCountPhotosFromDB;
  static readonly GetTokenTutorial: GrpcServiceGetTokenTutorial;
  static readonly StartTrain: GrpcServiceStartTrain;
  static readonly GetTrainingNow: GrpcServiceGetTrainingNow;
  static readonly GetWeigthName: GrpcServiceGetWeigthName;
  static readonly RunAutoLike: GrpcServiceRunAutoLike;
  static readonly StopAutoLike: GrpcServiceStopAutoLike;
  static readonly GetAutoLikeIsRun: GrpcServiceGetAutoLikeIsRun;
  static readonly StreamingDownloadInfo: GrpcServiceStreamingDownloadInfo;
  static readonly StreamingGetFaceDetectRunInfo: GrpcServiceStreamingGetFaceDetectRunInfo;
  static readonly StreamingGetLoadingPhotos: GrpcServiceStreamingGetLoadingPhotos;
  static readonly StreamingTrainStatus: GrpcServiceStreamingTrainStatus;
  static readonly StreamingAutoLike: GrpcServiceStreamingAutoLike;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class GrpcServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  getToken(
    requestMessage: grpctransport_grpc_pb.EmptyMessage,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: grpctransport_grpc_pb.GetTokenResponse|null) => void
  ): UnaryResponse;
  getToken(
    requestMessage: grpctransport_grpc_pb.EmptyMessage,
    callback: (error: ServiceError|null, responseMessage: grpctransport_grpc_pb.GetTokenResponse|null) => void
  ): UnaryResponse;
  setToken(
    requestMessage: grpctransport_grpc_pb.SetTokenRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: grpctransport_grpc_pb.SetTokenResponse|null) => void
  ): UnaryResponse;
  setToken(
    requestMessage: grpctransport_grpc_pb.SetTokenRequest,
    callback: (error: ServiceError|null, responseMessage: grpctransport_grpc_pb.SetTokenResponse|null) => void
  ): UnaryResponse;
  getDownloadedInfoFromDB(
    requestMessage: grpctransport_grpc_pb.EmptyMessage,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: grpctransport_grpc_pb.GetDownloadInfoFromDBResponse|null) => void
  ): UnaryResponse;
  getDownloadedInfoFromDB(
    requestMessage: grpctransport_grpc_pb.EmptyMessage,
    callback: (error: ServiceError|null, responseMessage: grpctransport_grpc_pb.GetDownloadInfoFromDBResponse|null) => void
  ): UnaryResponse;
  getUsers(
    requestMessage: grpctransport_grpc_pb.GetUsersRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: grpctransport_grpc_pb.GetUsersResponse|null) => void
  ): UnaryResponse;
  getUsers(
    requestMessage: grpctransport_grpc_pb.GetUsersRequest,
    callback: (error: ServiceError|null, responseMessage: grpctransport_grpc_pb.GetUsersResponse|null) => void
  ): UnaryResponse;
  likeDislike(
    requestMessage: grpctransport_grpc_pb.LikeDislikeRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: grpctransport_grpc_pb.EmptyMessage|null) => void
  ): UnaryResponse;
  likeDislike(
    requestMessage: grpctransport_grpc_pb.LikeDislikeRequest,
    callback: (error: ServiceError|null, responseMessage: grpctransport_grpc_pb.EmptyMessage|null) => void
  ): UnaryResponse;
  setDownloadPhotos(
    requestMessage: grpctransport_grpc_pb.SetDownloadPhotosRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: grpctransport_grpc_pb.SetDownloadPhotosResponse|null) => void
  ): UnaryResponse;
  setDownloadPhotos(
    requestMessage: grpctransport_grpc_pb.SetDownloadPhotosRequest,
    callback: (error: ServiceError|null, responseMessage: grpctransport_grpc_pb.SetDownloadPhotosResponse|null) => void
  ): UnaryResponse;
  stopDownload(
    requestMessage: grpctransport_grpc_pb.EmptyMessage,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: grpctransport_grpc_pb.EmptyMessage|null) => void
  ): UnaryResponse;
  stopDownload(
    requestMessage: grpctransport_grpc_pb.EmptyMessage,
    callback: (error: ServiceError|null, responseMessage: grpctransport_grpc_pb.EmptyMessage|null) => void
  ): UnaryResponse;
  drawBox(
    requestMessage: grpctransport_grpc_pb.DrawBoxRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: grpctransport_grpc_pb.TrueFalse|null) => void
  ): UnaryResponse;
  drawBox(
    requestMessage: grpctransport_grpc_pb.DrawBoxRequest,
    callback: (error: ServiceError|null, responseMessage: grpctransport_grpc_pb.TrueFalse|null) => void
  ): UnaryResponse;
  passOrIgnore(
    requestMessage: grpctransport_grpc_pb.PassOrIgnoreRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: grpctransport_grpc_pb.PassOrIgnoreResponse|null) => void
  ): UnaryResponse;
  passOrIgnore(
    requestMessage: grpctransport_grpc_pb.PassOrIgnoreRequest,
    callback: (error: ServiceError|null, responseMessage: grpctransport_grpc_pb.PassOrIgnoreResponse|null) => void
  ): UnaryResponse;
  predictUser(
    requestMessage: grpctransport_grpc_pb.PredictUserRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: grpctransport_grpc_pb.PredictUserResponse|null) => void
  ): UnaryResponse;
  predictUser(
    requestMessage: grpctransport_grpc_pb.PredictUserRequest,
    callback: (error: ServiceError|null, responseMessage: grpctransport_grpc_pb.PredictUserResponse|null) => void
  ): UnaryResponse;
  deleteLastLikes(
    requestMessage: grpctransport_grpc_pb.SetLikeToNullLastNUsers,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: grpctransport_grpc_pb.EmptyMessage|null) => void
  ): UnaryResponse;
  deleteLastLikes(
    requestMessage: grpctransport_grpc_pb.SetLikeToNullLastNUsers,
    callback: (error: ServiceError|null, responseMessage: grpctransport_grpc_pb.EmptyMessage|null) => void
  ): UnaryResponse;
  getPossibilityDeleteLastLikes(
    requestMessage: grpctransport_grpc_pb.SetLikeToNullLastNUsers,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: grpctransport_grpc_pb.PossibilityDeleteLastLikes|null) => void
  ): UnaryResponse;
  getPossibilityDeleteLastLikes(
    requestMessage: grpctransport_grpc_pb.SetLikeToNullLastNUsers,
    callback: (error: ServiceError|null, responseMessage: grpctransport_grpc_pb.PossibilityDeleteLastLikes|null) => void
  ): UnaryResponse;
  deleteAllLikes(
    requestMessage: grpctransport_grpc_pb.EmptyMessage,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: grpctransport_grpc_pb.EmptyMessage|null) => void
  ): UnaryResponse;
  deleteAllLikes(
    requestMessage: grpctransport_grpc_pb.EmptyMessage,
    callback: (error: ServiceError|null, responseMessage: grpctransport_grpc_pb.EmptyMessage|null) => void
  ): UnaryResponse;
  permanentlyDeleteAllInfo(
    requestMessage: grpctransport_grpc_pb.EmptyMessage,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: grpctransport_grpc_pb.EmptyMessage|null) => void
  ): UnaryResponse;
  permanentlyDeleteAllInfo(
    requestMessage: grpctransport_grpc_pb.EmptyMessage,
    callback: (error: ServiceError|null, responseMessage: grpctransport_grpc_pb.EmptyMessage|null) => void
  ): UnaryResponse;
  likeDislikeCountPhotosFromDB(
    requestMessage: grpctransport_grpc_pb.EmptyMessage,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: grpctransport_grpc_pb.LikeDislikeCountPhotosFromDBResponse|null) => void
  ): UnaryResponse;
  likeDislikeCountPhotosFromDB(
    requestMessage: grpctransport_grpc_pb.EmptyMessage,
    callback: (error: ServiceError|null, responseMessage: grpctransport_grpc_pb.LikeDislikeCountPhotosFromDBResponse|null) => void
  ): UnaryResponse;
  getTokenTutorial(
    requestMessage: grpctransport_grpc_pb.EmptyMessage,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: grpctransport_grpc_pb.GetTokenTutorialResponse|null) => void
  ): UnaryResponse;
  getTokenTutorial(
    requestMessage: grpctransport_grpc_pb.EmptyMessage,
    callback: (error: ServiceError|null, responseMessage: grpctransport_grpc_pb.GetTokenTutorialResponse|null) => void
  ): UnaryResponse;
  startTrain(
    requestMessage: grpctransport_grpc_pb.TrainRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: grpctransport_grpc_pb.TrainResponse|null) => void
  ): UnaryResponse;
  startTrain(
    requestMessage: grpctransport_grpc_pb.TrainRequest,
    callback: (error: ServiceError|null, responseMessage: grpctransport_grpc_pb.TrainResponse|null) => void
  ): UnaryResponse;
  getTrainingNow(
    requestMessage: grpctransport_grpc_pb.EmptyMessage,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: grpctransport_grpc_pb.TrainResponse|null) => void
  ): UnaryResponse;
  getTrainingNow(
    requestMessage: grpctransport_grpc_pb.EmptyMessage,
    callback: (error: ServiceError|null, responseMessage: grpctransport_grpc_pb.TrainResponse|null) => void
  ): UnaryResponse;
  getWeigthName(
    requestMessage: grpctransport_grpc_pb.EmptyMessage,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: grpctransport_grpc_pb.GetWeigthNameResponse|null) => void
  ): UnaryResponse;
  getWeigthName(
    requestMessage: grpctransport_grpc_pb.EmptyMessage,
    callback: (error: ServiceError|null, responseMessage: grpctransport_grpc_pb.GetWeigthNameResponse|null) => void
  ): UnaryResponse;
  runAutoLike(
    requestMessage: grpctransport_grpc_pb.EmptyMessage,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: grpctransport_grpc_pb.EmptyMessage|null) => void
  ): UnaryResponse;
  runAutoLike(
    requestMessage: grpctransport_grpc_pb.EmptyMessage,
    callback: (error: ServiceError|null, responseMessage: grpctransport_grpc_pb.EmptyMessage|null) => void
  ): UnaryResponse;
  stopAutoLike(
    requestMessage: grpctransport_grpc_pb.EmptyMessage,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: grpctransport_grpc_pb.EmptyMessage|null) => void
  ): UnaryResponse;
  stopAutoLike(
    requestMessage: grpctransport_grpc_pb.EmptyMessage,
    callback: (error: ServiceError|null, responseMessage: grpctransport_grpc_pb.EmptyMessage|null) => void
  ): UnaryResponse;
  getAutoLikeIsRun(
    requestMessage: grpctransport_grpc_pb.EmptyMessage,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: grpctransport_grpc_pb.GetAutoLikeIsRunResponse|null) => void
  ): UnaryResponse;
  getAutoLikeIsRun(
    requestMessage: grpctransport_grpc_pb.EmptyMessage,
    callback: (error: ServiceError|null, responseMessage: grpctransport_grpc_pb.GetAutoLikeIsRunResponse|null) => void
  ): UnaryResponse;
  streamingDownloadInfo(requestMessage: grpctransport_grpc_pb.EmptyMessage, metadata?: grpc.Metadata): ResponseStream<grpctransport_grpc_pb.DownloadInfoResponse>;
  streamingGetFaceDetectRunInfo(requestMessage: grpctransport_grpc_pb.EmptyMessage, metadata?: grpc.Metadata): ResponseStream<grpctransport_grpc_pb.GetFaceDetectRunInfoResponse>;
  streamingGetLoadingPhotos(requestMessage: grpctransport_grpc_pb.EmptyMessage, metadata?: grpc.Metadata): ResponseStream<grpctransport_grpc_pb.GetLoadingPhotosResponse>;
  streamingTrainStatus(requestMessage: grpctransport_grpc_pb.EmptyMessage, metadata?: grpc.Metadata): ResponseStream<grpctransport_grpc_pb.FitStatusResponse>;
  streamingAutoLike(requestMessage: grpctransport_grpc_pb.EmptyMessage, metadata?: grpc.Metadata): ResponseStream<grpctransport_grpc_pb.AutoLikeResponse>;
}

