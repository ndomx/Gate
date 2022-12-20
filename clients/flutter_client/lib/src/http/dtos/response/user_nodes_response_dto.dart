import 'package:flutter_client/src/http/dtos/common/node_dto.dart';
import 'package:flutter_client/src/http/dtos/common/user_dto.dart';

class UserNodesResponseDto {
  final UserDto user;
  final List<NodeDto> nodes;

  const UserNodesResponseDto({required this.user, required this.nodes});

  factory UserNodesResponseDto.fromJson(Map<String, dynamic> json) {
    return UserNodesResponseDto(
        user: json['user'],
        nodes: List<NodeDto>.from(
            json['nodes'].map((item) => NodeDto.fromJson(item))));
  }

  Map<String, dynamic> toJson() {
    return {
      'user': user,
      'nodes': nodes.map((node) => node.toJson()),
    };
  }
}
