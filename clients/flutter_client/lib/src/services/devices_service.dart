import 'package:flutter_client/src/db/entities/node_entity.dart';
import 'package:flutter_client/src/db/gate_database.dart';
import 'package:flutter_client/src/http/dtos/response/access_response_dto.dart';
import 'package:flutter_client/src/http/dtos/response/user_nodes_response_dto.dart';
import 'package:flutter_client/src/http/gate_client.dart';
import 'package:flutter_client/src/services/auth_service.dart';
import 'package:flutter_client/src/services/prefs_service.dart';
import 'package:flutter_client/src/services/settings_service.dart';

class DevicesService {
  final _settingsService = SettingsService();

  Future<List<NodeEntity>?> getStoredNodes() {
    final db = GateDatabase();
    return db.getAllNodes();
  }

  Future<void> removeNodes() async {
    final db = GateDatabase();
    await db.clearDatabase();
  }

  Future<UserNodesResponseDto?> fetchAndSaveNodes() async {
    final host = await PrefsService.load<String>(PrefsService.hostUrlKey,
        encrypted: true);
    if (host == null) {
      return null;
    }

    final token = await PrefsService.load<String>(PrefsService.accessTokenKey,
        encrypted: true);
    if (token == null) {
      return null;
    }

    final client = GateClient();
    final res = await client.fetchUserNodes(host, token);
    if (res == null) {
      return null;
    }

    final db = GateDatabase();
    await db.insertNodes(List.from(
        res.nodes.map((node) => NodeEntity(id: node.id, name: node.name))));

    return res;
  }

  Future<AccessResponseDto?> requestAccess(String deviceId) async {
    final authResult = await _authenticate();
    if (!authResult) {
      return null;
    }

    final host = await PrefsService.load<String>(PrefsService.hostUrlKey,
        encrypted: true);
    if (host == null) {
      return null;
    }

    final token = await PrefsService.load<String>(PrefsService.accessTokenKey,
        encrypted: true);
    if (token == null) {
      return null;
    }

    final client = GateClient();
    return client.requestAccess(host, token, deviceId);
  }

  Future<bool> _authenticate() async {
    final isAuthRequired = await _settingsService.requireAuth();
    if (!isAuthRequired) {
      return true;
    }

    final auth = AuthService();
    return auth.authenticate();
  }
}