import 'package:flutter_client/src/http/dtos/common/node_info_dto.dart';

class NodeDto {
  final String id;
  final String rootId;
  final String parentId;
  final String name;
  final NodeInfoDto nodeInfo;

  const NodeDto(
      {required this.id,
      required this.rootId,
      required this.parentId,
      required this.name,
      required this.nodeInfo});

  factory NodeDto.fromJson(Map<String, dynamic> json) {
    return NodeDto(
        id: json['nodeId'],
        rootId: json['rootId'],
        parentId: json['parent'],
        name: json['name'],
        nodeInfo: NodeInfoDto.fromJson(json['nodeInfo']));
  }

  Map<String, dynamic> toJson() {
    return {
      'nodeId': id,
      'rootId': rootId,
      'parent': parentId,
      'name': name,
      'nodeInfo': nodeInfo.toJson(),
    };
  }
}
