// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.28.1
// 	protoc        v5.26.1
// source: protos/marker.proto

package protos

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type Marker struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	MarkerId  int32   `protobuf:"varint,1,opt,name=markerId,proto3" json:"markerId,omitempty" db:"MarkerID"`
	Latitude  float64 `protobuf:"fixed64,2,opt,name=latitude,proto3" json:"latitude,omitempty" db:"Latitude"`
	Longitude float64 `protobuf:"fixed64,3,opt,name=longitude,proto3" json:"longitude,omitempty" db:"Longitude"`
}

func (x *Marker) Reset() {
	*x = Marker{}
	if protoimpl.UnsafeEnabled {
		mi := &file_protos_marker_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Marker) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Marker) ProtoMessage() {}

func (x *Marker) ProtoReflect() protoreflect.Message {
	mi := &file_protos_marker_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Marker.ProtoReflect.Descriptor instead.
func (*Marker) Descriptor() ([]byte, []int) {
	return file_protos_marker_proto_rawDescGZIP(), []int{0}
}

func (x *Marker) GetMarkerId() int32 {
	if x != nil {
		return x.MarkerId
	}
	return 0
}

func (x *Marker) GetLatitude() float64 {
	if x != nil {
		return x.Latitude
	}
	return 0
}

func (x *Marker) GetLongitude() float64 {
	if x != nil {
		return x.Longitude
	}
	return 0
}

type MarkerList struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Markers []*Marker `protobuf:"bytes,1,rep,name=markers,proto3" json:"markers,omitempty"`
}

func (x *MarkerList) Reset() {
	*x = MarkerList{}
	if protoimpl.UnsafeEnabled {
		mi := &file_protos_marker_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *MarkerList) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*MarkerList) ProtoMessage() {}

func (x *MarkerList) ProtoReflect() protoreflect.Message {
	mi := &file_protos_marker_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use MarkerList.ProtoReflect.Descriptor instead.
func (*MarkerList) Descriptor() ([]byte, []int) {
	return file_protos_marker_proto_rawDescGZIP(), []int{1}
}

func (x *MarkerList) GetMarkers() []*Marker {
	if x != nil {
		return x.Markers
	}
	return nil
}

var File_protos_marker_proto protoreflect.FileDescriptor

var file_protos_marker_proto_rawDesc = []byte{
	0x0a, 0x13, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x73, 0x2f, 0x6d, 0x61, 0x72, 0x6b, 0x65, 0x72, 0x2e,
	0x70, 0x72, 0x6f, 0x74, 0x6f, 0x22, 0x5e, 0x0a, 0x06, 0x4d, 0x61, 0x72, 0x6b, 0x65, 0x72, 0x12,
	0x1a, 0x0a, 0x08, 0x6d, 0x61, 0x72, 0x6b, 0x65, 0x72, 0x49, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28,
	0x05, 0x52, 0x08, 0x6d, 0x61, 0x72, 0x6b, 0x65, 0x72, 0x49, 0x64, 0x12, 0x1a, 0x0a, 0x08, 0x6c,
	0x61, 0x74, 0x69, 0x74, 0x75, 0x64, 0x65, 0x18, 0x02, 0x20, 0x01, 0x28, 0x01, 0x52, 0x08, 0x6c,
	0x61, 0x74, 0x69, 0x74, 0x75, 0x64, 0x65, 0x12, 0x1c, 0x0a, 0x09, 0x6c, 0x6f, 0x6e, 0x67, 0x69,
	0x74, 0x75, 0x64, 0x65, 0x18, 0x03, 0x20, 0x01, 0x28, 0x01, 0x52, 0x09, 0x6c, 0x6f, 0x6e, 0x67,
	0x69, 0x74, 0x75, 0x64, 0x65, 0x22, 0x2f, 0x0a, 0x0a, 0x4d, 0x61, 0x72, 0x6b, 0x65, 0x72, 0x4c,
	0x69, 0x73, 0x74, 0x12, 0x21, 0x0a, 0x07, 0x6d, 0x61, 0x72, 0x6b, 0x65, 0x72, 0x73, 0x18, 0x01,
	0x20, 0x03, 0x28, 0x0b, 0x32, 0x07, 0x2e, 0x4d, 0x61, 0x72, 0x6b, 0x65, 0x72, 0x52, 0x07, 0x6d,
	0x61, 0x72, 0x6b, 0x65, 0x72, 0x73, 0x42, 0x1b, 0x5a, 0x19, 0x63, 0x68, 0x75, 0x6c, 0x62, 0x6f,
	0x6e, 0x67, 0x2d, 0x6b, 0x72, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x73, 0x3b, 0x6d, 0x61, 0x72,
	0x6b, 0x65, 0x72, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_protos_marker_proto_rawDescOnce sync.Once
	file_protos_marker_proto_rawDescData = file_protos_marker_proto_rawDesc
)

func file_protos_marker_proto_rawDescGZIP() []byte {
	file_protos_marker_proto_rawDescOnce.Do(func() {
		file_protos_marker_proto_rawDescData = protoimpl.X.CompressGZIP(file_protos_marker_proto_rawDescData)
	})
	return file_protos_marker_proto_rawDescData
}

var file_protos_marker_proto_msgTypes = make([]protoimpl.MessageInfo, 2)
var file_protos_marker_proto_goTypes = []interface{}{
	(*Marker)(nil),     // 0: Marker
	(*MarkerList)(nil), // 1: MarkerList
}
var file_protos_marker_proto_depIdxs = []int32{
	0, // 0: MarkerList.markers:type_name -> Marker
	1, // [1:1] is the sub-list for method output_type
	1, // [1:1] is the sub-list for method input_type
	1, // [1:1] is the sub-list for extension type_name
	1, // [1:1] is the sub-list for extension extendee
	0, // [0:1] is the sub-list for field type_name
}

func init() { file_protos_marker_proto_init() }
func file_protos_marker_proto_init() {
	if File_protos_marker_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_protos_marker_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Marker); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_protos_marker_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*MarkerList); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_protos_marker_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   2,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_protos_marker_proto_goTypes,
		DependencyIndexes: file_protos_marker_proto_depIdxs,
		MessageInfos:      file_protos_marker_proto_msgTypes,
	}.Build()
	File_protos_marker_proto = out.File
	file_protos_marker_proto_rawDesc = nil
	file_protos_marker_proto_goTypes = nil
	file_protos_marker_proto_depIdxs = nil
}
