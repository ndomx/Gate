import 'package:flutter/material.dart';
import 'package:flutter_client/src/db/entities/node_entity.dart';

enum DeviceState { idle, waiting, failure, success }

class DeviceViewModel {
  static const successAnimationDuration = 2;
  static const failureAnimationDuration = 2;

  final NodeEntity node;
  DeviceState state = DeviceState.idle;

  DeviceViewModel(this.node);

  Color get backgroundColor {
    switch (state) {
      case DeviceState.idle:
        return Colors.black;
      case DeviceState.waiting:
        return Colors.purple;
      case DeviceState.failure:
        return Colors.red;
      case DeviceState.success:
        return Colors.green;
    }
  }

  Widget get stateIcon {
    switch (state) {
      case DeviceState.waiting:
        return const Stack(
          children: [
            Center(
              child: Icon(
                Icons.lock_outline,
                color: Colors.white,
              ),
            ),
            Center(child: CircularProgressIndicator(value: null))
          ],
        );
      case DeviceState.success:
        return const Icon(
          Icons.lock_open,
          color: Colors.white,
        );
      default:
        return const Icon(
          Icons.lock_outline,
          color: Colors.white,
        );
    }
  }

  bool get isClickable => state == DeviceState.idle;
}
