// package: grpctransport
// file: grpctransport/grpc.proto

import * as jspb from "google-protobuf";

export class EmptyMessage extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EmptyMessage.AsObject;
  static toObject(includeInstance: boolean, msg: EmptyMessage): EmptyMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EmptyMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EmptyMessage;
  static deserializeBinaryFromReader(message: EmptyMessage, reader: jspb.BinaryReader): EmptyMessage;
}

export namespace EmptyMessage {
  export type AsObject = {
  }
}

export class GetTokenResponse extends jspb.Message {
  getActualtoken(): boolean;
  setActualtoken(value: boolean): void;

  getToken(): string;
  setToken(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTokenResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetTokenResponse): GetTokenResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetTokenResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTokenResponse;
  static deserializeBinaryFromReader(message: GetTokenResponse, reader: jspb.BinaryReader): GetTokenResponse;
}

export namespace GetTokenResponse {
  export type AsObject = {
    actualtoken: boolean,
    token: string,
  }
}

export class GetDownloadInfoFromDBResponse extends jspb.Message {
  getNndatasetcount(): number;
  setNndatasetcount(value: number): void;

  getNndatasetaccountscount(): number;
  setNndatasetaccountscount(value: number): void;

  getNndatasetswipedaccountscount(): number;
  setNndatasetswipedaccountscount(value: number): void;

  getNndatasetswipedphotoscount(): number;
  setNndatasetswipedphotoscount(value: number): void;

  getDownloadedaccountscount(): number;
  setDownloadedaccountscount(value: number): void;

  getDownloadedphotoscount(): number;
  setDownloadedphotoscount(value: number): void;

  getRundownload(): boolean;
  setRundownload(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetDownloadInfoFromDBResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetDownloadInfoFromDBResponse): GetDownloadInfoFromDBResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetDownloadInfoFromDBResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetDownloadInfoFromDBResponse;
  static deserializeBinaryFromReader(message: GetDownloadInfoFromDBResponse, reader: jspb.BinaryReader): GetDownloadInfoFromDBResponse;
}

export namespace GetDownloadInfoFromDBResponse {
  export type AsObject = {
    nndatasetcount: number,
    nndatasetaccountscount: number,
    nndatasetswipedaccountscount: number,
    nndatasetswipedphotoscount: number,
    downloadedaccountscount: number,
    downloadedphotoscount: number,
    rundownload: boolean,
  }
}

export class SetTokenRequest extends jspb.Message {
  getToken(): string;
  setToken(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetTokenRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SetTokenRequest): SetTokenRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SetTokenRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetTokenRequest;
  static deserializeBinaryFromReader(message: SetTokenRequest, reader: jspb.BinaryReader): SetTokenRequest;
}

export namespace SetTokenRequest {
  export type AsObject = {
    token: string,
  }
}

export class SetTokenResponse extends jspb.Message {
  getActualtoken(): boolean;
  setActualtoken(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetTokenResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SetTokenResponse): SetTokenResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SetTokenResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetTokenResponse;
  static deserializeBinaryFromReader(message: SetTokenResponse, reader: jspb.BinaryReader): SetTokenResponse;
}

export namespace SetTokenResponse {
  export type AsObject = {
    actualtoken: boolean,
  }
}

export class User extends jspb.Message {
  getUserid(): number;
  setUserid(value: number): void;

  clearPicList(): void;
  getPicList(): Array<Uint8Array | string>;
  getPicList_asU8(): Array<Uint8Array>;
  getPicList_asB64(): Array<string>;
  setPicList(value: Array<Uint8Array | string>): void;
  addPic(value: Uint8Array | string, index?: number): Uint8Array | string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): User.AsObject;
  static toObject(includeInstance: boolean, msg: User): User.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: User, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): User;
  static deserializeBinaryFromReader(message: User, reader: jspb.BinaryReader): User;
}

export namespace User {
  export type AsObject = {
    userid: number,
    picList: Array<Uint8Array | string>,
  }
}

export class GetUsersRequest extends jspb.Message {
  getFromuserid(): number;
  setFromuserid(value: number): void;

  getCountofusers(): number;
  setCountofusers(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetUsersRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetUsersRequest): GetUsersRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetUsersRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetUsersRequest;
  static deserializeBinaryFromReader(message: GetUsersRequest, reader: jspb.BinaryReader): GetUsersRequest;
}

export namespace GetUsersRequest {
  export type AsObject = {
    fromuserid: number,
    countofusers: number,
  }
}

export class GetUsersResponse extends jspb.Message {
  clearUsersList(): void;
  getUsersList(): Array<User>;
  setUsersList(value: Array<User>): void;
  addUsers(value?: User, index?: number): User;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetUsersResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetUsersResponse): GetUsersResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetUsersResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetUsersResponse;
  static deserializeBinaryFromReader(message: GetUsersResponse, reader: jspb.BinaryReader): GetUsersResponse;
}

export namespace GetUsersResponse {
  export type AsObject = {
    usersList: Array<User.AsObject>,
  }
}

export class LikeDislikeRequest extends jspb.Message {
  getUserid(): number;
  setUserid(value: number): void;

  getLikedislike(): boolean;
  setLikedislike(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LikeDislikeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: LikeDislikeRequest): LikeDislikeRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: LikeDislikeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LikeDislikeRequest;
  static deserializeBinaryFromReader(message: LikeDislikeRequest, reader: jspb.BinaryReader): LikeDislikeRequest;
}

export namespace LikeDislikeRequest {
  export type AsObject = {
    userid: number,
    likedislike: boolean,
  }
}

export class SetDownloadPhotosRequest extends jspb.Message {
  getPhotoscount(): number;
  setPhotoscount(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetDownloadPhotosRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SetDownloadPhotosRequest): SetDownloadPhotosRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SetDownloadPhotosRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetDownloadPhotosRequest;
  static deserializeBinaryFromReader(message: SetDownloadPhotosRequest, reader: jspb.BinaryReader): SetDownloadPhotosRequest;
}

export namespace SetDownloadPhotosRequest {
  export type AsObject = {
    photoscount: number,
  }
}

export class SetDownloadPhotosResponse extends jspb.Message {
  getNnservicerun(): boolean;
  setNnservicerun(value: boolean): void;

  getSuccessrun(): boolean;
  setSuccessrun(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetDownloadPhotosResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SetDownloadPhotosResponse): SetDownloadPhotosResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SetDownloadPhotosResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetDownloadPhotosResponse;
  static deserializeBinaryFromReader(message: SetDownloadPhotosResponse, reader: jspb.BinaryReader): SetDownloadPhotosResponse;
}

export namespace SetDownloadPhotosResponse {
  export type AsObject = {
    nnservicerun: boolean,
    successrun: boolean,
  }
}

export class DownloadInfoResponse extends jspb.Message {
  getNewaccounts(): number;
  setNewaccounts(value: number): void;

  getUpdateaccounts(): number;
  setUpdateaccounts(value: number): void;

  getSameaccounts(): number;
  setSameaccounts(value: number): void;

  getMatchingaccounts(): number;
  setMatchingaccounts(value: number): void;

  getPhotosnow(): number;
  setPhotosnow(value: number): void;

  getCountofdownloadedphotos(): number;
  setCountofdownloadedphotos(value: number): void;

  getCountofsamephotos(): number;
  setCountofsamephotos(value: number): void;

  getCountofmissingphotos(): number;
  setCountofmissingphotos(value: number): void;

  getMatchingnnphotoscount(): number;
  setMatchingnnphotoscount(value: number): void;

  getErrphotoscount(): number;
  setErrphotoscount(value: number): void;

  getSuccessdownload(): boolean;
  setSuccessdownload(value: boolean): void;

  getRundownload(): boolean;
  setRundownload(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DownloadInfoResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DownloadInfoResponse): DownloadInfoResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DownloadInfoResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DownloadInfoResponse;
  static deserializeBinaryFromReader(message: DownloadInfoResponse, reader: jspb.BinaryReader): DownloadInfoResponse;
}

export namespace DownloadInfoResponse {
  export type AsObject = {
    newaccounts: number,
    updateaccounts: number,
    sameaccounts: number,
    matchingaccounts: number,
    photosnow: number,
    countofdownloadedphotos: number,
    countofsamephotos: number,
    countofmissingphotos: number,
    matchingnnphotoscount: number,
    errphotoscount: number,
    successdownload: boolean,
    rundownload: boolean,
  }
}

export class GetFaceDetectRunInfoResponse extends jspb.Message {
  getFacedetectrun(): boolean;
  setFacedetectrun(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetFaceDetectRunInfoResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetFaceDetectRunInfoResponse): GetFaceDetectRunInfoResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetFaceDetectRunInfoResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetFaceDetectRunInfoResponse;
  static deserializeBinaryFromReader(message: GetFaceDetectRunInfoResponse, reader: jspb.BinaryReader): GetFaceDetectRunInfoResponse;
}

export namespace GetFaceDetectRunInfoResponse {
  export type AsObject = {
    facedetectrun: boolean,
  }
}

export class GetLoadingPhotosResponse extends jspb.Message {
  getTruenew(): boolean;
  setTruenew(value: boolean): void;

  getTruephoto(): Uint8Array | string;
  getTruephoto_asU8(): Uint8Array;
  getTruephoto_asB64(): string;
  setTruephoto(value: Uint8Array | string): void;

  getFalsenew(): boolean;
  setFalsenew(value: boolean): void;

  getFalsephoto(): Uint8Array | string;
  getFalsephoto_asU8(): Uint8Array;
  getFalsephoto_asB64(): string;
  setFalsephoto(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetLoadingPhotosResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetLoadingPhotosResponse): GetLoadingPhotosResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetLoadingPhotosResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetLoadingPhotosResponse;
  static deserializeBinaryFromReader(message: GetLoadingPhotosResponse, reader: jspb.BinaryReader): GetLoadingPhotosResponse;
}

export namespace GetLoadingPhotosResponse {
  export type AsObject = {
    truenew: boolean,
    truephoto: Uint8Array | string,
    falsenew: boolean,
    falsephoto: Uint8Array | string,
  }
}

export class DrawBoxRequest extends jspb.Message {
  getSet(): boolean;
  setSet(value: boolean): void;

  getDrawbox(): boolean;
  setDrawbox(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DrawBoxRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DrawBoxRequest): DrawBoxRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DrawBoxRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DrawBoxRequest;
  static deserializeBinaryFromReader(message: DrawBoxRequest, reader: jspb.BinaryReader): DrawBoxRequest;
}

export namespace DrawBoxRequest {
  export type AsObject = {
    set: boolean,
    drawbox: boolean,
  }
}

export class TrueFalse extends jspb.Message {
  getBoolean(): boolean;
  setBoolean(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TrueFalse.AsObject;
  static toObject(includeInstance: boolean, msg: TrueFalse): TrueFalse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TrueFalse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TrueFalse;
  static deserializeBinaryFromReader(message: TrueFalse, reader: jspb.BinaryReader): TrueFalse;
}

export namespace TrueFalse {
  export type AsObject = {
    pb_boolean: boolean,
  }
}

export class PassOrIgnoreRequest extends jspb.Message {
  getSet(): boolean;
  setSet(value: boolean): void;

  getPass(): boolean;
  setPass(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PassOrIgnoreRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PassOrIgnoreRequest): PassOrIgnoreRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PassOrIgnoreRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PassOrIgnoreRequest;
  static deserializeBinaryFromReader(message: PassOrIgnoreRequest, reader: jspb.BinaryReader): PassOrIgnoreRequest;
}

export namespace PassOrIgnoreRequest {
  export type AsObject = {
    set: boolean,
    pass: boolean,
  }
}

export class PassOrIgnoreResponse extends jspb.Message {
  getPass(): boolean;
  setPass(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PassOrIgnoreResponse.AsObject;
  static toObject(includeInstance: boolean, msg: PassOrIgnoreResponse): PassOrIgnoreResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PassOrIgnoreResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PassOrIgnoreResponse;
  static deserializeBinaryFromReader(message: PassOrIgnoreResponse, reader: jspb.BinaryReader): PassOrIgnoreResponse;
}

export namespace PassOrIgnoreResponse {
  export type AsObject = {
    pass: boolean,
  }
}

export class SetLikeToNullLastNUsers extends jspb.Message {
  getCountlastusers(): number;
  setCountlastusers(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetLikeToNullLastNUsers.AsObject;
  static toObject(includeInstance: boolean, msg: SetLikeToNullLastNUsers): SetLikeToNullLastNUsers.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SetLikeToNullLastNUsers, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetLikeToNullLastNUsers;
  static deserializeBinaryFromReader(message: SetLikeToNullLastNUsers, reader: jspb.BinaryReader): SetLikeToNullLastNUsers;
}

export namespace SetLikeToNullLastNUsers {
  export type AsObject = {
    countlastusers: number,
  }
}

export class PossibilityDeleteLastLikes extends jspb.Message {
  getPossibility(): boolean;
  setPossibility(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PossibilityDeleteLastLikes.AsObject;
  static toObject(includeInstance: boolean, msg: PossibilityDeleteLastLikes): PossibilityDeleteLastLikes.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PossibilityDeleteLastLikes, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PossibilityDeleteLastLikes;
  static deserializeBinaryFromReader(message: PossibilityDeleteLastLikes, reader: jspb.BinaryReader): PossibilityDeleteLastLikes;
}

export namespace PossibilityDeleteLastLikes {
  export type AsObject = {
    possibility: boolean,
  }
}

export class PredictUserRequest extends jspb.Message {
  getUserid(): number;
  setUserid(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PredictUserRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PredictUserRequest): PredictUserRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PredictUserRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PredictUserRequest;
  static deserializeBinaryFromReader(message: PredictUserRequest, reader: jspb.BinaryReader): PredictUserRequest;
}

export namespace PredictUserRequest {
  export type AsObject = {
    userid: number,
  }
}

export class PredictUserResponse extends jspb.Message {
  getUserid(): number;
  setUserid(value: number): void;

  getLikepercent(): number;
  setLikepercent(value: number): void;

  getDislikepercent(): number;
  setDislikepercent(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PredictUserResponse.AsObject;
  static toObject(includeInstance: boolean, msg: PredictUserResponse): PredictUserResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PredictUserResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PredictUserResponse;
  static deserializeBinaryFromReader(message: PredictUserResponse, reader: jspb.BinaryReader): PredictUserResponse;
}

export namespace PredictUserResponse {
  export type AsObject = {
    userid: number,
    likepercent: number,
    dislikepercent: number,
  }
}

export class TrainRequest extends jspb.Message {
  getCountofepochs(): number;
  setCountofepochs(value: number): void;

  getAlignds(): boolean;
  setAlignds(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TrainRequest.AsObject;
  static toObject(includeInstance: boolean, msg: TrainRequest): TrainRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TrainRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TrainRequest;
  static deserializeBinaryFromReader(message: TrainRequest, reader: jspb.BinaryReader): TrainRequest;
}

export namespace TrainRequest {
  export type AsObject = {
    countofepochs: number,
    alignds: boolean,
  }
}

export class TrainResponse extends jspb.Message {
  getTrainingnow(): boolean;
  setTrainingnow(value: boolean): void;

  getAllepochcount(): number;
  setAllepochcount(value: number): void;

  getAllbatchcount(): number;
  setAllbatchcount(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TrainResponse.AsObject;
  static toObject(includeInstance: boolean, msg: TrainResponse): TrainResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TrainResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TrainResponse;
  static deserializeBinaryFromReader(message: TrainResponse, reader: jspb.BinaryReader): TrainResponse;
}

export namespace TrainResponse {
  export type AsObject = {
    trainingnow: boolean,
    allepochcount: number,
    allbatchcount: number,
  }
}

export class FitStatusResponse extends jspb.Message {
  getEpoch(): number;
  setEpoch(value: number): void;

  getBatch(): number;
  setBatch(value: number): void;

  getTraining(): boolean;
  setTraining(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FitStatusResponse.AsObject;
  static toObject(includeInstance: boolean, msg: FitStatusResponse): FitStatusResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FitStatusResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FitStatusResponse;
  static deserializeBinaryFromReader(message: FitStatusResponse, reader: jspb.BinaryReader): FitStatusResponse;
}

export namespace FitStatusResponse {
  export type AsObject = {
    epoch: number,
    batch: number,
    training: boolean,
  }
}

export class AutoLikeResponse extends jspb.Message {
  clearPhotosList(): void;
  getPhotosList(): Array<Uint8Array | string>;
  getPhotosList_asU8(): Array<Uint8Array>;
  getPhotosList_asB64(): Array<string>;
  setPhotosList(value: Array<Uint8Array | string>): void;
  addPhotos(value: Uint8Array | string, index?: number): Uint8Array | string;

  getLikepercent(): number;
  setLikepercent(value: number): void;

  getDislikepercent(): number;
  setDislikepercent(value: number): void;

  getSuccessautolike(): boolean;
  setSuccessautolike(value: boolean): void;

  getErrorautolike(): boolean;
  setErrorautolike(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AutoLikeResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AutoLikeResponse): AutoLikeResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AutoLikeResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AutoLikeResponse;
  static deserializeBinaryFromReader(message: AutoLikeResponse, reader: jspb.BinaryReader): AutoLikeResponse;
}

export namespace AutoLikeResponse {
  export type AsObject = {
    photosList: Array<Uint8Array | string>,
    likepercent: number,
    dislikepercent: number,
    successautolike: boolean,
    errorautolike: boolean,
  }
}

export class GetAutoLikeIsRunResponse extends jspb.Message {
  getAutolikerun(): boolean;
  setAutolikerun(value: boolean): void;

  getLikedcount(): number;
  setLikedcount(value: number): void;

  getDislikedcount(): number;
  setDislikedcount(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAutoLikeIsRunResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetAutoLikeIsRunResponse): GetAutoLikeIsRunResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetAutoLikeIsRunResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAutoLikeIsRunResponse;
  static deserializeBinaryFromReader(message: GetAutoLikeIsRunResponse, reader: jspb.BinaryReader): GetAutoLikeIsRunResponse;
}

export namespace GetAutoLikeIsRunResponse {
  export type AsObject = {
    autolikerun: boolean,
    likedcount: number,
    dislikedcount: number,
  }
}

export class GetWeigthNameResponse extends jspb.Message {
  getWeigthname(): string;
  setWeigthname(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetWeigthNameResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetWeigthNameResponse): GetWeigthNameResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetWeigthNameResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetWeigthNameResponse;
  static deserializeBinaryFromReader(message: GetWeigthNameResponse, reader: jspb.BinaryReader): GetWeigthNameResponse;
}

export namespace GetWeigthNameResponse {
  export type AsObject = {
    weigthname: string,
  }
}

export class LikeDislikeCountPhotosFromDBResponse extends jspb.Message {
  getLikecount(): number;
  setLikecount(value: number): void;

  getDislikecount(): number;
  setDislikecount(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LikeDislikeCountPhotosFromDBResponse.AsObject;
  static toObject(includeInstance: boolean, msg: LikeDislikeCountPhotosFromDBResponse): LikeDislikeCountPhotosFromDBResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: LikeDislikeCountPhotosFromDBResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LikeDislikeCountPhotosFromDBResponse;
  static deserializeBinaryFromReader(message: LikeDislikeCountPhotosFromDBResponse, reader: jspb.BinaryReader): LikeDislikeCountPhotosFromDBResponse;
}

export namespace LikeDislikeCountPhotosFromDBResponse {
  export type AsObject = {
    likecount: number,
    dislikecount: number,
  }
}

export class GetTokenTutorialResponse extends jspb.Message {
  getTokentutorial(): Uint8Array | string;
  getTokentutorial_asU8(): Uint8Array;
  getTokentutorial_asB64(): string;
  setTokentutorial(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTokenTutorialResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetTokenTutorialResponse): GetTokenTutorialResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetTokenTutorialResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTokenTutorialResponse;
  static deserializeBinaryFromReader(message: GetTokenTutorialResponse, reader: jspb.BinaryReader): GetTokenTutorialResponse;
}

export namespace GetTokenTutorialResponse {
  export type AsObject = {
    tokentutorial: Uint8Array | string,
  }
}

