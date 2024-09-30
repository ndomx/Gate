import 'package:flutter/material.dart';
import 'package:flutter_client/src/models/nodes/node.dart';
import 'package:flutter_client/src/widgets/node_card.dart';

class NodeListWidget extends StatelessWidget {
  const NodeListWidget({super.key, required this.nodes});

  final List<Node> nodes;

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemBuilder: (context, index) => NodeCard(node: nodes[index]),
      itemCount: nodes.length,
      padding: const EdgeInsets.all(2),
    );
  }
}
