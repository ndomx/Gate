import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_client/src/models/access_status.dart';
import 'package:flutter_client/src/models/node.dart';
import 'package:flutter_client/src/widgets/icons/access_icon.dart';

class NodeCard extends StatefulWidget {
  const NodeCard({super.key, required this.node});

  final Node node;

  @override
  State<NodeCard> createState() => _NodeCardState();
}

class _NodeCardState extends State<NodeCard> {
  AccessStatus _status = AccessStatus.idle;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Card(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            ListTile(
              title: Text(widget.node.displayName),
              subtitle: Text(widget.node.actionCode),
              trailing: AccessIcon(
                status: _status,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
