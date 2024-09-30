import 'package:flutter_client/src/models/access_status.dart';
import 'package:flutter_client/src/models/nodes/node.dart';

class NodeWithStatus extends Node {
  final AccessStatus status;

  const NodeWithStatus({
    required String id,
    required String name,
    required String displayName,
    required String actionCode,
    required String deviceId,
    required this.status,
  }) : super(
          id: id,
          name: name,
          displayName: displayName,
          actionCode: actionCode,
          deviceId: deviceId,
        );

  factory NodeWithStatus.fromJson(Map<String, dynamic> json) {
    return NodeWithStatus(
      id: json['id'],
      name: json['name'],
      displayName: json['displayName'],
      actionCode: json['actionCode'],
      deviceId: json['deviceId'],
      status: json['status'],
    );
  }

  factory NodeWithStatus.fromNode(Node base, AccessStatus status) {
    return NodeWithStatus(
      id: base.id,
      name: base.name,
      displayName: base.displayName,
      actionCode: base.actionCode,
      deviceId: base.deviceId,
      status: status,
    );
  }

  @override
  Map<String, String> toJson() {
    final json = super.toJson();
    json['status'] = status.toString();
    return json;
  }
}
