import 'package:flutter/material.dart';
import 'package:flutter_client/src/http/gate_client.dart';
import 'package:flutter_client/src/models/access_status.dart';
import 'package:flutter_client/src/models/activate_device_request.dart';
import 'package:flutter_client/src/models/command_status.dart';
import 'package:flutter_client/src/models/nodes/node.dart';
import 'package:flutter_client/src/models/nodes/node_with_status.dart';

class NodesController with ChangeNotifier {
  final GateClient _client = GateClient();
  final List<NodeWithStatus> _nodes = List.empty();

  static const Duration _stateTransitionDelay = Duration(seconds: 1);
  static const Duration _pollingDelay = Duration(seconds: 1);
  static const int _pollingMaxRetries = 10;

  Future<void> activateNode(int index) async {
    Node node = _nodes[index];

    bool success = await _client.activateNode(
      node.id,
      const ActivateDeviceRequest(
        action: 'on',
        actionDetails: ActionDetails(timeout: 1000),
        userId: '234',
      ),
    );

    if (!success) {
      await _handleActivateNodeFailure(index);
      return;
    }

    int response = await _executeStatusPolling(index);
    if (response == 0) {
      await _handleActivateNodeSuccess(index);
      return;
    }

    await _handleActivateNodeFailure(index);
  }

  Future<void> _handleActivateNodeSuccess(int index) async {
    _setNodeStatus(index, AccessStatus.accessGranted);
    await Future.delayed(_stateTransitionDelay);

    _setNodeStatus(index, AccessStatus.idle);
  }

  Future<void> _handleActivateNodeFailure(int index) async {
    _setNodeStatus(index, AccessStatus.accessRejected);
    await Future.delayed(_stateTransitionDelay);

    _setNodeStatus(index, AccessStatus.idle);
  }

  Future<int> _executeStatusPolling(int index) async {
    Node node = _nodes[index];

    int retires = 0;
    int responseCode = -1;

    while (retires++ < _pollingMaxRetries && responseCode < 0) {
      CommandStatus? response = await _client.getCommandStatus(node.id);
      responseCode = response?.responseCode ?? -1;

      await Future.delayed(_pollingDelay);
    }

    return responseCode;
  }

  void _setNodeStatus(int index, AccessStatus status) {
    Node current = _nodes[index];
    _nodes[index] = NodeWithStatus.fromNode(current, AccessStatus.accessRejected);
    notifyListeners();
  }
}
