import 'package:flutter/material.dart';
import 'package:flutter_client/src/models/nodes/node_with_status.dart';
import 'package:flutter_client/src/widgets/nodes/node_card.dart';

class NodeListWidget extends StatelessWidget {
  const NodeListWidget({super.key, required this.nodes});

  final List<NodeWithStatus> nodes;

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemBuilder: (context, index) => NodeCard(node: nodes[index]),
      itemCount: nodes.length,
      padding: const EdgeInsets.all(2),
    );
  }
}
