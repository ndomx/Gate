import 'package:flutter_client/src/models/nodes/node.dart';
import 'package:flutter_client/src/models/user.dart';

class UserWithNodes {
  final User user;
  final List<Node> nodes;

  const UserWithNodes({required this.user, required this.nodes});

  factory UserWithNodes.fromJson(Map<String, dynamic> json) {
    return UserWithNodes(
      user: User.fromJson(json['user']),
      nodes: List<Node>.from(json['nodes']!.map((node) => Node.fromJson(node))),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'user': user.toJson(),
      'nodes': nodes.map((node) => node.toJson()).toList(),
    };
  }
}
