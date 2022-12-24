import 'package:flutter_client/src/services/devices_service.dart';
import 'package:flutter_client/src/viewmodels/device_viewmodel.dart';

class DevicesController {
  final _devicesService = DevicesService();

  Future<List<DeviceViewModel>> loadDevices() async {
    await Future.delayed(const Duration(seconds: 2));

    final nodes = await _devicesService.getStoredNodes();
    if (nodes == null) {
      return [];
    }

    return List.from(nodes.map((node) => DeviceViewModel(node)));
  }

  Future<List<DeviceViewModel>> refreshData() async {
    await _devicesService.removeNodes();
    await _devicesService.fetchAndSaveNodes();
    
    return loadDevices();
  }

  Future<bool> requestAccess(DeviceViewModel device) async {
    final res = await _devicesService.requestAccess(device.node.id);
    return (res == null) ? false : res.success;
  }
}
