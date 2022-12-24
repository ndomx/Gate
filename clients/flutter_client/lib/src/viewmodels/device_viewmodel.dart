import 'package:flutter/material.dart';
import 'package:flutter_client/src/db/entities/node_entity.dart';

enum DeviceState { idle, waiting, failure, success }

class DeviceViewModel {
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

  Icon get icon {
    if (state == DeviceState.success) {
      return const Icon(Icons.lock_outline);
    } else {
      return const Icon(Icons.lock_open_outlined);
    }
  }

  bool get isClickable => state == DeviceState.idle;
}
