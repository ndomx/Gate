import 'package:flutter_client/src/http/dtos/common/node_dto.dart';

class AccessResponseDto {
  final NodeDto node;
  final String topic;
  final bool success;

  const AccessResponseDto(
      {required this.node, required this.topic, required this.success});

  factory AccessResponseDto.fromJson(Map<String, dynamic> json) {
    return AccessResponseDto(
        node: NodeDto.fromJson(json['node']),
        topic: json['topic'],
        success: json['success']);
  }

  Map<String, dynamic> toJson() {
    return {
      'node': node.toJson(),
      'topic': topic,
      'success': success,
    };
  }
}
