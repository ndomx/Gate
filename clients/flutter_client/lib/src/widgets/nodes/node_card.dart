import 'package:flutter/material.dart';
import 'package:flutter_client/src/models/nodes/node_with_status.dart';
import 'package:flutter_client/src/widgets/nodes/access_icon.dart';

class NodeCard extends StatelessWidget {
  const NodeCard({super.key, required this.node});

  final NodeWithStatus node;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Card(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            ListTile(
              title: Text(node.displayName),
              subtitle: Text(node.actionCode),
              trailing: AccessIcon(
                status: node.status,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
