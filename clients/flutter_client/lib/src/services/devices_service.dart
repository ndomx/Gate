import 'dart:async';

import 'package:flutter_client/src/db/entities/node_entity.dart';
import 'package:flutter_client/src/db/gate_database.dart';
import 'package:flutter_client/src/http/dtos/requests/activate_device_request_dto.dart';
import 'package:flutter_client/src/http/dtos/response/command_status_dto.dart';
import 'package:flutter_client/src/http/dtos/response/user_nodes_response_dto.dart';
import 'package:flutter_client/src/http/gate_client.dart';
import 'package:flutter_client/src/models/server_attributes.dart';
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

  Future<bool> checkLogin() async {
    final token = await PrefsService.load<String>(PrefsService.accessTokenKey, encrypted: true);

    return (token != null);
  }

  Future<UserNodesResponseDto?> fetchAndSaveNodes() async {
    final attrs = await _loadServerAttributes();
    if (attrs == null) {
      return null;
    }

    final client = GateClient();
    final res = await client.fetchUserNodes(attrs.host, attrs.token);
    if (res == null) {
      return null;
    }

    final db = GateDatabase();
    await db.insertNodes(List.from(res.nodes.map((node) => NodeEntity(id: node.id, name: node.displayName))));

    return res;
  }

  Future<bool> requestAccess(String deviceId) async {
    final authResult = await _authenticate();
    if (!authResult) {
      return false;
    }

    const request = ActivateDeviceRequestDto(action: 'on');

    final attrs = await _loadServerAttributes();
    if (attrs == null) {
      return false;
    }

    final client = GateClient();
    return client.requestAccess(attrs.host, attrs.token, deviceId, request);
  }

  Future<CommandStatusDto?> startStatusPolling(String deviceId) async {
    final authResult = await _authenticate();
    if (!authResult) {
      return null;
    }

    final attrs = await _loadServerAttributes();
    if (attrs == null) {
      return null;
    }

    final client = GateClient();

    const maxRetries = 10;
    int retries = 0;
    CommandStatusDto? response;

    while (retries++ < maxRetries && response?.responseCode == null) {
      response = await client.getCommandStatus(attrs.host, attrs.token, deviceId);
      await Future.delayed(const Duration(seconds: 1));
    }

    return response;
  }

  Future<bool> _authenticate() async {
    final isAuthRequired = await _settingsService.requireAuth();
    if (!isAuthRequired) {
      return true;
    }

    final auth = AuthService();
    return auth.authenticate();
  }

  Future<ServerAttributes?> _loadServerAttributes() async {
    final host = await PrefsService.load<String>(PrefsService.hostUrlKey, encrypted: true);
    if (host == null) {
      return null;
    }

    final token = await PrefsService.load<String>(PrefsService.accessTokenKey, encrypted: true);
    if (token == null) {
      return null;
    }

    return ServerAttributes(host: host, token: token);
  }
}
