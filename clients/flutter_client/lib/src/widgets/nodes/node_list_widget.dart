import 'package:flutter/material.dart';
import 'package:flutter_client/src/models/nodes/node_with_status.dart';
import 'package:flutter_client/src/widgets/nodes/node_card.dart';

class NodeListWidget extends StatelessWidget {
  const NodeListWidget({super.key, required this.nodes, required this.onNodeTap});

  final List<NodeWithStatus> nodes;
  final Future<void> Function(int) onNodeTap;

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemBuilder: (context, index) => GestureDetector(
        child: NodeCard(node: nodes[index]),
        onTap: () => onNodeTap(index),
      ),
      itemCount: nodes.length,
      padding: const EdgeInsets.all(2),
    );
  }
}
