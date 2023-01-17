class NodeInfoDto {
  final bool isDevice;

  const NodeInfoDto({required this.isDevice});

  factory NodeInfoDto.fromJson(Map<String, dynamic> json) {
    return NodeInfoDto(isDevice: json['isDevice']);
  }

  Map<String, dynamic> toJson() {
    return {
      'isDevice': isDevice,
    };
  }
}
