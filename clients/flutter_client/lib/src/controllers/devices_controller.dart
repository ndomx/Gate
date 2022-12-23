import 'package:flutter_client/src/db/entities/node_entity.dart';
import 'package:flutter_client/src/viewmodels/device_viewmodel.dart';

class DevicesController {
  Future<List<DeviceViewModel>?> loadDevices() async {
    await Future.delayed(const Duration(seconds: 4));

    return [const DeviceViewModel(NodeEntity(id: '123', name: 'name'))];
  }

  Future<void> requestAccess(DeviceViewModel device) async {
    print(device.node.id);
  }
}
