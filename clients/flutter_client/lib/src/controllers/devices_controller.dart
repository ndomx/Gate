import 'package:flutter_client/src/services/devices_service.dart';
import 'package:flutter_client/src/viewmodels/device_viewmodel.dart';

class DevicesController {
  final _devicesService = DevicesService();

  Future<List<DeviceViewModel>> loadDevicesIfLoggedIn() async {
    final isLoggedIn = await _devicesService.checkLogin();
    if (!isLoggedIn) {
      return [];
    }
    
    final nodes = await _devicesService.getStoredNodes();
    if (nodes == null) {
      return [];
    }

    return List.from(nodes.map((node) => DeviceViewModel(node)));
  }

  Future<List<DeviceViewModel>> refreshData() async {
    await _devicesService.removeNodes();
    await _devicesService.fetchAndSaveNodes();

    return loadDevicesIfLoggedIn();
  }

  Future<bool> requestAccess(DeviceViewModel device) {
    return _devicesService.requestAccess(device.node.id);
  }
}
