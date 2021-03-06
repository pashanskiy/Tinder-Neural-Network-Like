# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: grpcnn.proto
"""Generated protocol buffer code."""
from google.protobuf.internal import enum_type_wrapper
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor.FileDescriptor(
  name='grpcnn.proto',
  package='grpctransport',
  syntax='proto3',
  serialized_options=b'Z7github.com/pashanskiy/tnn/components/grpc;grpctransport',
  create_key=_descriptor._internal_create_key,
  serialized_pb=b'\n\x0cgrpcnn.proto\x12\rgrpctransport\"\x10\n\x0e\x45mptyMessageNN\"\x89\x02\n\x04\x46\x61\x63\x65\x12\t\n\x01X\x18\x01 \x01(\x05\x12\t\n\x01Y\x18\x02 \x01(\x05\x12\r\n\x05Width\x18\x03 \x01(\x05\x12\x0e\n\x06Height\x18\x04 \x01(\x05\x12\r\n\x05NoseX\x18\x05 \x01(\x05\x12\r\n\x05NoseY\x18\x06 \x01(\x05\x12\x10\n\x08LeftEyeX\x18\x07 \x01(\x05\x12\x10\n\x08LeftEyeY\x18\x08 \x01(\x05\x12\x11\n\tRightEyeX\x18\t \x01(\x05\x12\x11\n\tRightEyeY\x18\n \x01(\x05\x12\x12\n\nMouthLeftX\x18\x0b \x01(\x05\x12\x12\n\nMouthLeftY\x18\x0c \x01(\x05\x12\x13\n\x0bMouthRightX\x18\r \x01(\x05\x12\x13\n\x0bMouthRightY\x18\x0e \x01(\x05\x12\x12\n\nConfidence\x18\x0f \x01(\x02\"5\n\x0eGetFaceRequest\x12\x0f\n\x07PhotoId\x18\x01 \x01(\t\x12\x12\n\nPhotoBytes\x18\x02 \x01(\x0c\"F\n\x0fGetFaceResponse\x12\x0f\n\x07PhotoId\x18\x01 \x01(\t\x12\"\n\x05\x46\x61\x63\x65s\x18\x02 \x03(\x0b\x32\x13.grpctransport.Face\">\n\x17PredictFromBytesRequest\x12\x0e\n\x06UserId\x18\x01 \x01(\x05\x12\x13\n\x0bPhotosBytes\x18\x02 \x03(\x0c\"C\n\x15PhotosToModelResponse\x12\x0e\n\x06UserId\x18\x01 \x01(\x05\x12\x1a\n\x12PredictLikeDislike\x18\x02 \x03(\x02\"0\n\rPhotoNameLike\x12\x11\n\tPhotoName\x18\x01 \x01(\t\x12\x0c\n\x04Like\x18\x02 \x01(\x08\"\x9f\x01\n\x14\x46itAllToModelRequest\x12\x15\n\rCountOfEpochs\x18\x01 \x01(\x05\x12\x33\n\rPhotoNameLike\x18\x02 \x03(\x0b\x32\x1c.grpctransport.PhotoNameLike\x12;\n\x15PhotoNameLikeValidate\x18\x03 \x03(\x0b\x32\x1c.grpctransport.PhotoNameLike\"3\n\x13\x46itStatusResponseNN\x12\r\n\x05\x45poch\x18\x01 \x01(\x05\x12\r\n\x05\x42\x61tch\x18\x02 \x01(\x05\"6\n CutBackgroundAndValidFaceRequest\x12\x12\n\nPhotoBytes\x18\x01 \x01(\x0c\"F\n!CutBackgroundAndValidFaceResponse\x12\x12\n\nPhotoBytes\x18\x01 \x01(\x0c\x12\r\n\x05Valid\x18\x02 \x01(\x02*6\n\x0c\x46itOrPredict\x12\x10\n\x0c\x46ITORPREDICT\x10\x00\x12\x07\n\x03\x46IT\x10\x01\x12\x0b\n\x07PREDICT\x10\x02*5\n\x0bLikeDislike\x12\x0f\n\x0bLIKEDISLIKE\x10\x00\x12\x08\n\x04LIKE\x10\x01\x12\x0b\n\x07\x44ISLIKE\x10\x02\x32\xd4\x05\n\rGrpcServiceNN\x12H\n\x06PingNN\x12\x1d.grpctransport.EmptyMessageNN\x1a\x1d.grpctransport.EmptyMessageNN\"\x00\x12J\n\x07GetFace\x12\x1d.grpctransport.GetFaceRequest\x1a\x1e.grpctransport.GetFaceResponse\"\x00\x12\x62\n\x10PredictFromBytes\x12&.grpctransport.PredictFromBytesRequest\x1a$.grpctransport.PhotosToModelResponse\"\x00\x12M\n\x0bLoadWeigths\x12\x1d.grpctransport.EmptyMessageNN\x1a\x1d.grpctransport.EmptyMessageNN\"\x00\x12U\n\rFitAllToModel\x12#.grpctransport.FitAllToModelRequest\x1a\x1d.grpctransport.EmptyMessageNN\"\x00\x12U\n\x0eGetStatusOfFit\x12\x1d.grpctransport.EmptyMessageNN\x1a\".grpctransport.FitStatusResponseNN\"\x00\x12\x80\x01\n\x19\x43utBackgroundAndValidFace\x12/.grpctransport.CutBackgroundAndValidFaceRequest\x1a\x30.grpctransport.CutBackgroundAndValidFaceResponse\"\x00\x12I\n\x07\x45xitApp\x12\x1d.grpctransport.EmptyMessageNN\x1a\x1d.grpctransport.EmptyMessageNN\"\x00\x42\x39Z7github.com/pashanskiy/tnn/components/grpc;grpctransportb\x06proto3'
)

_FITORPREDICT = _descriptor.EnumDescriptor(
  name='FitOrPredict',
  full_name='grpctransport.FitOrPredict',
  filename=None,
  file=DESCRIPTOR,
  create_key=_descriptor._internal_create_key,
  values=[
    _descriptor.EnumValueDescriptor(
      name='FITORPREDICT', index=0, number=0,
      serialized_options=None,
      type=None,
      create_key=_descriptor._internal_create_key),
    _descriptor.EnumValueDescriptor(
      name='FIT', index=1, number=1,
      serialized_options=None,
      type=None,
      create_key=_descriptor._internal_create_key),
    _descriptor.EnumValueDescriptor(
      name='PREDICT', index=2, number=2,
      serialized_options=None,
      type=None,
      create_key=_descriptor._internal_create_key),
  ],
  containing_type=None,
  serialized_options=None,
  serialized_start=970,
  serialized_end=1024,
)
_sym_db.RegisterEnumDescriptor(_FITORPREDICT)

FitOrPredict = enum_type_wrapper.EnumTypeWrapper(_FITORPREDICT)
_LIKEDISLIKE = _descriptor.EnumDescriptor(
  name='LikeDislike',
  full_name='grpctransport.LikeDislike',
  filename=None,
  file=DESCRIPTOR,
  create_key=_descriptor._internal_create_key,
  values=[
    _descriptor.EnumValueDescriptor(
      name='LIKEDISLIKE', index=0, number=0,
      serialized_options=None,
      type=None,
      create_key=_descriptor._internal_create_key),
    _descriptor.EnumValueDescriptor(
      name='LIKE', index=1, number=1,
      serialized_options=None,
      type=None,
      create_key=_descriptor._internal_create_key),
    _descriptor.EnumValueDescriptor(
      name='DISLIKE', index=2, number=2,
      serialized_options=None,
      type=None,
      create_key=_descriptor._internal_create_key),
  ],
  containing_type=None,
  serialized_options=None,
  serialized_start=1026,
  serialized_end=1079,
)
_sym_db.RegisterEnumDescriptor(_LIKEDISLIKE)

LikeDislike = enum_type_wrapper.EnumTypeWrapper(_LIKEDISLIKE)
FITORPREDICT = 0
FIT = 1
PREDICT = 2
LIKEDISLIKE = 0
LIKE = 1
DISLIKE = 2



_EMPTYMESSAGENN = _descriptor.Descriptor(
  name='EmptyMessageNN',
  full_name='grpctransport.EmptyMessageNN',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=31,
  serialized_end=47,
)


_FACE = _descriptor.Descriptor(
  name='Face',
  full_name='grpctransport.Face',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='X', full_name='grpctransport.Face.X', index=0,
      number=1, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='Y', full_name='grpctransport.Face.Y', index=1,
      number=2, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='Width', full_name='grpctransport.Face.Width', index=2,
      number=3, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='Height', full_name='grpctransport.Face.Height', index=3,
      number=4, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='NoseX', full_name='grpctransport.Face.NoseX', index=4,
      number=5, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='NoseY', full_name='grpctransport.Face.NoseY', index=5,
      number=6, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='LeftEyeX', full_name='grpctransport.Face.LeftEyeX', index=6,
      number=7, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='LeftEyeY', full_name='grpctransport.Face.LeftEyeY', index=7,
      number=8, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='RightEyeX', full_name='grpctransport.Face.RightEyeX', index=8,
      number=9, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='RightEyeY', full_name='grpctransport.Face.RightEyeY', index=9,
      number=10, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='MouthLeftX', full_name='grpctransport.Face.MouthLeftX', index=10,
      number=11, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='MouthLeftY', full_name='grpctransport.Face.MouthLeftY', index=11,
      number=12, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='MouthRightX', full_name='grpctransport.Face.MouthRightX', index=12,
      number=13, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='MouthRightY', full_name='grpctransport.Face.MouthRightY', index=13,
      number=14, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='Confidence', full_name='grpctransport.Face.Confidence', index=14,
      number=15, type=2, cpp_type=6, label=1,
      has_default_value=False, default_value=float(0),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=50,
  serialized_end=315,
)


_GETFACEREQUEST = _descriptor.Descriptor(
  name='GetFaceRequest',
  full_name='grpctransport.GetFaceRequest',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='PhotoId', full_name='grpctransport.GetFaceRequest.PhotoId', index=0,
      number=1, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='PhotoBytes', full_name='grpctransport.GetFaceRequest.PhotoBytes', index=1,
      number=2, type=12, cpp_type=9, label=1,
      has_default_value=False, default_value=b"",
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=317,
  serialized_end=370,
)


_GETFACERESPONSE = _descriptor.Descriptor(
  name='GetFaceResponse',
  full_name='grpctransport.GetFaceResponse',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='PhotoId', full_name='grpctransport.GetFaceResponse.PhotoId', index=0,
      number=1, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='Faces', full_name='grpctransport.GetFaceResponse.Faces', index=1,
      number=2, type=11, cpp_type=10, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=372,
  serialized_end=442,
)


_PREDICTFROMBYTESREQUEST = _descriptor.Descriptor(
  name='PredictFromBytesRequest',
  full_name='grpctransport.PredictFromBytesRequest',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='UserId', full_name='grpctransport.PredictFromBytesRequest.UserId', index=0,
      number=1, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='PhotosBytes', full_name='grpctransport.PredictFromBytesRequest.PhotosBytes', index=1,
      number=2, type=12, cpp_type=9, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=444,
  serialized_end=506,
)


_PHOTOSTOMODELRESPONSE = _descriptor.Descriptor(
  name='PhotosToModelResponse',
  full_name='grpctransport.PhotosToModelResponse',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='UserId', full_name='grpctransport.PhotosToModelResponse.UserId', index=0,
      number=1, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='PredictLikeDislike', full_name='grpctransport.PhotosToModelResponse.PredictLikeDislike', index=1,
      number=2, type=2, cpp_type=6, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=508,
  serialized_end=575,
)


_PHOTONAMELIKE = _descriptor.Descriptor(
  name='PhotoNameLike',
  full_name='grpctransport.PhotoNameLike',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='PhotoName', full_name='grpctransport.PhotoNameLike.PhotoName', index=0,
      number=1, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='Like', full_name='grpctransport.PhotoNameLike.Like', index=1,
      number=2, type=8, cpp_type=7, label=1,
      has_default_value=False, default_value=False,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=577,
  serialized_end=625,
)


_FITALLTOMODELREQUEST = _descriptor.Descriptor(
  name='FitAllToModelRequest',
  full_name='grpctransport.FitAllToModelRequest',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='CountOfEpochs', full_name='grpctransport.FitAllToModelRequest.CountOfEpochs', index=0,
      number=1, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='PhotoNameLike', full_name='grpctransport.FitAllToModelRequest.PhotoNameLike', index=1,
      number=2, type=11, cpp_type=10, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='PhotoNameLikeValidate', full_name='grpctransport.FitAllToModelRequest.PhotoNameLikeValidate', index=2,
      number=3, type=11, cpp_type=10, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=628,
  serialized_end=787,
)


_FITSTATUSRESPONSENN = _descriptor.Descriptor(
  name='FitStatusResponseNN',
  full_name='grpctransport.FitStatusResponseNN',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='Epoch', full_name='grpctransport.FitStatusResponseNN.Epoch', index=0,
      number=1, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='Batch', full_name='grpctransport.FitStatusResponseNN.Batch', index=1,
      number=2, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=789,
  serialized_end=840,
)


_CUTBACKGROUNDANDVALIDFACEREQUEST = _descriptor.Descriptor(
  name='CutBackgroundAndValidFaceRequest',
  full_name='grpctransport.CutBackgroundAndValidFaceRequest',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='PhotoBytes', full_name='grpctransport.CutBackgroundAndValidFaceRequest.PhotoBytes', index=0,
      number=1, type=12, cpp_type=9, label=1,
      has_default_value=False, default_value=b"",
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=842,
  serialized_end=896,
)


_CUTBACKGROUNDANDVALIDFACERESPONSE = _descriptor.Descriptor(
  name='CutBackgroundAndValidFaceResponse',
  full_name='grpctransport.CutBackgroundAndValidFaceResponse',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='PhotoBytes', full_name='grpctransport.CutBackgroundAndValidFaceResponse.PhotoBytes', index=0,
      number=1, type=12, cpp_type=9, label=1,
      has_default_value=False, default_value=b"",
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='Valid', full_name='grpctransport.CutBackgroundAndValidFaceResponse.Valid', index=1,
      number=2, type=2, cpp_type=6, label=1,
      has_default_value=False, default_value=float(0),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=898,
  serialized_end=968,
)

_GETFACERESPONSE.fields_by_name['Faces'].message_type = _FACE
_FITALLTOMODELREQUEST.fields_by_name['PhotoNameLike'].message_type = _PHOTONAMELIKE
_FITALLTOMODELREQUEST.fields_by_name['PhotoNameLikeValidate'].message_type = _PHOTONAMELIKE
DESCRIPTOR.message_types_by_name['EmptyMessageNN'] = _EMPTYMESSAGENN
DESCRIPTOR.message_types_by_name['Face'] = _FACE
DESCRIPTOR.message_types_by_name['GetFaceRequest'] = _GETFACEREQUEST
DESCRIPTOR.message_types_by_name['GetFaceResponse'] = _GETFACERESPONSE
DESCRIPTOR.message_types_by_name['PredictFromBytesRequest'] = _PREDICTFROMBYTESREQUEST
DESCRIPTOR.message_types_by_name['PhotosToModelResponse'] = _PHOTOSTOMODELRESPONSE
DESCRIPTOR.message_types_by_name['PhotoNameLike'] = _PHOTONAMELIKE
DESCRIPTOR.message_types_by_name['FitAllToModelRequest'] = _FITALLTOMODELREQUEST
DESCRIPTOR.message_types_by_name['FitStatusResponseNN'] = _FITSTATUSRESPONSENN
DESCRIPTOR.message_types_by_name['CutBackgroundAndValidFaceRequest'] = _CUTBACKGROUNDANDVALIDFACEREQUEST
DESCRIPTOR.message_types_by_name['CutBackgroundAndValidFaceResponse'] = _CUTBACKGROUNDANDVALIDFACERESPONSE
DESCRIPTOR.enum_types_by_name['FitOrPredict'] = _FITORPREDICT
DESCRIPTOR.enum_types_by_name['LikeDislike'] = _LIKEDISLIKE
_sym_db.RegisterFileDescriptor(DESCRIPTOR)

EmptyMessageNN = _reflection.GeneratedProtocolMessageType('EmptyMessageNN', (_message.Message,), {
  'DESCRIPTOR' : _EMPTYMESSAGENN,
  '__module__' : 'grpcnn_pb2'
  # @@protoc_insertion_point(class_scope:grpctransport.EmptyMessageNN)
  })
_sym_db.RegisterMessage(EmptyMessageNN)

Face = _reflection.GeneratedProtocolMessageType('Face', (_message.Message,), {
  'DESCRIPTOR' : _FACE,
  '__module__' : 'grpcnn_pb2'
  # @@protoc_insertion_point(class_scope:grpctransport.Face)
  })
_sym_db.RegisterMessage(Face)

GetFaceRequest = _reflection.GeneratedProtocolMessageType('GetFaceRequest', (_message.Message,), {
  'DESCRIPTOR' : _GETFACEREQUEST,
  '__module__' : 'grpcnn_pb2'
  # @@protoc_insertion_point(class_scope:grpctransport.GetFaceRequest)
  })
_sym_db.RegisterMessage(GetFaceRequest)

GetFaceResponse = _reflection.GeneratedProtocolMessageType('GetFaceResponse', (_message.Message,), {
  'DESCRIPTOR' : _GETFACERESPONSE,
  '__module__' : 'grpcnn_pb2'
  # @@protoc_insertion_point(class_scope:grpctransport.GetFaceResponse)
  })
_sym_db.RegisterMessage(GetFaceResponse)

PredictFromBytesRequest = _reflection.GeneratedProtocolMessageType('PredictFromBytesRequest', (_message.Message,), {
  'DESCRIPTOR' : _PREDICTFROMBYTESREQUEST,
  '__module__' : 'grpcnn_pb2'
  # @@protoc_insertion_point(class_scope:grpctransport.PredictFromBytesRequest)
  })
_sym_db.RegisterMessage(PredictFromBytesRequest)

PhotosToModelResponse = _reflection.GeneratedProtocolMessageType('PhotosToModelResponse', (_message.Message,), {
  'DESCRIPTOR' : _PHOTOSTOMODELRESPONSE,
  '__module__' : 'grpcnn_pb2'
  # @@protoc_insertion_point(class_scope:grpctransport.PhotosToModelResponse)
  })
_sym_db.RegisterMessage(PhotosToModelResponse)

PhotoNameLike = _reflection.GeneratedProtocolMessageType('PhotoNameLike', (_message.Message,), {
  'DESCRIPTOR' : _PHOTONAMELIKE,
  '__module__' : 'grpcnn_pb2'
  # @@protoc_insertion_point(class_scope:grpctransport.PhotoNameLike)
  })
_sym_db.RegisterMessage(PhotoNameLike)

FitAllToModelRequest = _reflection.GeneratedProtocolMessageType('FitAllToModelRequest', (_message.Message,), {
  'DESCRIPTOR' : _FITALLTOMODELREQUEST,
  '__module__' : 'grpcnn_pb2'
  # @@protoc_insertion_point(class_scope:grpctransport.FitAllToModelRequest)
  })
_sym_db.RegisterMessage(FitAllToModelRequest)

FitStatusResponseNN = _reflection.GeneratedProtocolMessageType('FitStatusResponseNN', (_message.Message,), {
  'DESCRIPTOR' : _FITSTATUSRESPONSENN,
  '__module__' : 'grpcnn_pb2'
  # @@protoc_insertion_point(class_scope:grpctransport.FitStatusResponseNN)
  })
_sym_db.RegisterMessage(FitStatusResponseNN)

CutBackgroundAndValidFaceRequest = _reflection.GeneratedProtocolMessageType('CutBackgroundAndValidFaceRequest', (_message.Message,), {
  'DESCRIPTOR' : _CUTBACKGROUNDANDVALIDFACEREQUEST,
  '__module__' : 'grpcnn_pb2'
  # @@protoc_insertion_point(class_scope:grpctransport.CutBackgroundAndValidFaceRequest)
  })
_sym_db.RegisterMessage(CutBackgroundAndValidFaceRequest)

CutBackgroundAndValidFaceResponse = _reflection.GeneratedProtocolMessageType('CutBackgroundAndValidFaceResponse', (_message.Message,), {
  'DESCRIPTOR' : _CUTBACKGROUNDANDVALIDFACERESPONSE,
  '__module__' : 'grpcnn_pb2'
  # @@protoc_insertion_point(class_scope:grpctransport.CutBackgroundAndValidFaceResponse)
  })
_sym_db.RegisterMessage(CutBackgroundAndValidFaceResponse)


DESCRIPTOR._options = None

_GRPCSERVICENN = _descriptor.ServiceDescriptor(
  name='GrpcServiceNN',
  full_name='grpctransport.GrpcServiceNN',
  file=DESCRIPTOR,
  index=0,
  serialized_options=None,
  create_key=_descriptor._internal_create_key,
  serialized_start=1082,
  serialized_end=1806,
  methods=[
  _descriptor.MethodDescriptor(
    name='PingNN',
    full_name='grpctransport.GrpcServiceNN.PingNN',
    index=0,
    containing_service=None,
    input_type=_EMPTYMESSAGENN,
    output_type=_EMPTYMESSAGENN,
    serialized_options=None,
    create_key=_descriptor._internal_create_key,
  ),
  _descriptor.MethodDescriptor(
    name='GetFace',
    full_name='grpctransport.GrpcServiceNN.GetFace',
    index=1,
    containing_service=None,
    input_type=_GETFACEREQUEST,
    output_type=_GETFACERESPONSE,
    serialized_options=None,
    create_key=_descriptor._internal_create_key,
  ),
  _descriptor.MethodDescriptor(
    name='PredictFromBytes',
    full_name='grpctransport.GrpcServiceNN.PredictFromBytes',
    index=2,
    containing_service=None,
    input_type=_PREDICTFROMBYTESREQUEST,
    output_type=_PHOTOSTOMODELRESPONSE,
    serialized_options=None,
    create_key=_descriptor._internal_create_key,
  ),
  _descriptor.MethodDescriptor(
    name='LoadWeigths',
    full_name='grpctransport.GrpcServiceNN.LoadWeigths',
    index=3,
    containing_service=None,
    input_type=_EMPTYMESSAGENN,
    output_type=_EMPTYMESSAGENN,
    serialized_options=None,
    create_key=_descriptor._internal_create_key,
  ),
  _descriptor.MethodDescriptor(
    name='FitAllToModel',
    full_name='grpctransport.GrpcServiceNN.FitAllToModel',
    index=4,
    containing_service=None,
    input_type=_FITALLTOMODELREQUEST,
    output_type=_EMPTYMESSAGENN,
    serialized_options=None,
    create_key=_descriptor._internal_create_key,
  ),
  _descriptor.MethodDescriptor(
    name='GetStatusOfFit',
    full_name='grpctransport.GrpcServiceNN.GetStatusOfFit',
    index=5,
    containing_service=None,
    input_type=_EMPTYMESSAGENN,
    output_type=_FITSTATUSRESPONSENN,
    serialized_options=None,
    create_key=_descriptor._internal_create_key,
  ),
  _descriptor.MethodDescriptor(
    name='CutBackgroundAndValidFace',
    full_name='grpctransport.GrpcServiceNN.CutBackgroundAndValidFace',
    index=6,
    containing_service=None,
    input_type=_CUTBACKGROUNDANDVALIDFACEREQUEST,
    output_type=_CUTBACKGROUNDANDVALIDFACERESPONSE,
    serialized_options=None,
    create_key=_descriptor._internal_create_key,
  ),
  _descriptor.MethodDescriptor(
    name='ExitApp',
    full_name='grpctransport.GrpcServiceNN.ExitApp',
    index=7,
    containing_service=None,
    input_type=_EMPTYMESSAGENN,
    output_type=_EMPTYMESSAGENN,
    serialized_options=None,
    create_key=_descriptor._internal_create_key,
  ),
])
_sym_db.RegisterServiceDescriptor(_GRPCSERVICENN)

DESCRIPTOR.services_by_name['GrpcServiceNN'] = _GRPCSERVICENN

# @@protoc_insertion_point(module_scope)
