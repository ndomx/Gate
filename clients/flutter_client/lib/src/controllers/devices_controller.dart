import 'package:flutter_client/src/db/entities/node_entity.dart';
import 'package:flutter_client/src/db/gate_database.dart';
import 'package:flutter_client/src/http/gate_client.dart';
import 'package:flutter_client/src/services/auth_service.dart';
import 'package:flutter_client/src/services/prefs_service.dart';
import 'package:flutter_client/src/services/settings_service.dart';
import 'package:flutter_client/src/viewmodels/device_viewmodel.dart';

class DevicesController {
  final SettingsService _settingsService = SettingsService();

  Future<List<DeviceViewModel>?> loadDevices() async {
    final db = GateDatabase();
    final nodes = await db.getAllNodes();
    return List.from(nodes.map((node) => DeviceViewModel(node)));
  }

  Future<bool> requestAccess(DeviceViewModel device) async {
    // check auth
    final auth = AuthService();
    final authResult = await auth.authenticate();
    print(authResult);

    // request access
    final client = GateClient();

    final host = await PrefsService.load<String>(PrefsService.hostUrlKey,
        encrypted: true);
    if (host == null) {
      print('host is null');
      return false;
    }

    final token = await PrefsService.load<String>(PrefsService.accessTokenKey,
        encrypted: true);
    if (token == null) {
      print('token is null');
      return false;
    }

    final res = await client.requestAccess(host, token, device.node.id);
    if (res == null) {
      print('res is null');
      return false;
    }

    print(res.toJson());
    return res.success;
  }
}
