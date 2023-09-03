class NodeInfoDto {
  final bool isDevice;
  final String actionCode;

  const NodeInfoDto({required this.isDevice, required this.actionCode});

  factory NodeInfoDto.fromJson(Map<String, dynamic> json) {
    return NodeInfoDto(
        isDevice: json['isDevice'], actionCode: json['actionCode']);
  }

  Map<String, dynamic> toJson() {
    return {
      'isDevice': isDevice,
      'actionCode': actionCode,
    };
  }
}
