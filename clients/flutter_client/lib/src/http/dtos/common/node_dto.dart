import 'package:flutter_client/src/http/dtos/common/node_info_dto.dart';

class NodeDto {
  final String id;
  final String rootId;
  final String parentId;
  final String name;
  final String displayName;
  final NodeInfoDto nodeInfo;
  
  const NodeDto({
    required this.id,
    required this.rootId,
    required this.parentId,
    required this.name,
    required this.displayName,
    required this.nodeInfo,
  });

  factory NodeDto.fromJson(Map<String, dynamic> json) {
    return NodeDto(
        id: json['id'],
        rootId: json['rootId'],
        parentId: json['parentId'],
        name: json['name'],
        displayName: json['displayName'],
        nodeInfo: NodeInfoDto.fromJson(json['nodeInfo']));
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'rootId': rootId,
      'parentId': parentId,
      'name': name,
      'displayName': displayName,
      'nodeInfo': nodeInfo.toJson(),
    };
  }
}
