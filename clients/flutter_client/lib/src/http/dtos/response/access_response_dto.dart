import 'package:flutter_client/src/http/dtos/common/node_dto.dart';

class AccessResponseDto {
  final NodeDto node;
  final String action;
  final bool success;

  const AccessResponseDto(
      {required this.node, required this.action, required this.success});

  factory AccessResponseDto.fromJson(Map<String, dynamic> json) {
    return AccessResponseDto(
        node: NodeDto.fromJson(json['node']),
        action: json['action'],
        success: json['success']);
  }

  Map<String, dynamic> toJson() {
    return {
      'node': node.toJson(),
      'action': action,
      'success': success,
    };
  }
}
