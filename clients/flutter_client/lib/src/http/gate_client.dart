import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:flutter_client/src/http/dtos/requests/activate_device_request_dto.dart';
import 'package:flutter_client/src/http/dtos/response/command_status_dto.dart';
import 'package:flutter_client/src/http/dtos/response/login_response_dto.dart';
import 'package:flutter_client/src/http/dtos/response/user_nodes_response_dto.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;

class GateClient {
  static final GateClient _instance = GateClient._internal();
  static final String _host = dotenv.get('GATE_BASE_URL');

  factory GateClient() {
    return _instance;
  }

  GateClient._internal();

  Future<bool> requestAccess(String token, String deviceId, ActivateDeviceRequestDto request) async {
    final url = _buildUrl('/gates/$deviceId/activate');

    http.Response res;
    try {
      res = await http.post(url, headers: _buildHeaders(token), body: request.toJson());
    } catch (e) {
      return false;
    }

    return res.statusCode == 204;
  }

  Future<CommandStatusDto?> getCommandStatus(String token, String deviceId) async {
    final url = _buildUrl('/gates/$deviceId/status');

    http.Response res;
    try {
      res = await http.get(url, headers: _buildHeaders(token));
    } catch (e) {
      return null;
    }

    final json = jsonDecode(res.body) as Map<String, dynamic>;
    CommandStatusDto? commandResponse;
    try {
      commandResponse = CommandStatusDto.fromJson(json);
    } catch (e) {
      commandResponse = null;
    }

    return commandResponse;
  }

  Future<LoginResponseDto?> login(String username, String password) async {
    final url = _buildUrl('/auth');

    http.Response res;
    try {
      res = await http.post(url,
          headers: {
            'Content-Type': 'application/json',
          },
          body: jsonEncode({
            'username': username,
            'password': password,
          }));
    } catch (e) {
      return null;
    }

    final json = jsonDecode(res.body) as Map<String, dynamic>;
    LoginResponseDto? loginResponse;
    try {
      loginResponse = LoginResponseDto.fromJson(json);
    } catch (e) {
      loginResponse = null;
    }

    return loginResponse;
  }

  Future<UserNodesResponseDto?> fetchUserNodes(String token) async {
    final url = _buildUrl('/gates/user', {'deviceOnly': 'true'});

    http.Response res;
    try {
      res = await http.get(url, headers: _buildHeaders(token));
    } catch (e) {
      return null;
    }

    final json = jsonDecode(res.body) as Map<String, dynamic>;
    UserNodesResponseDto? userNodes;
    try {
      userNodes = UserNodesResponseDto.fromJson(json);
    } catch (e) {
      userNodes = null;
    }

    return userNodes;
  }

  Uri _buildUrl(String path, [Map<String, dynamic>? query]) {
    if (kDebugMode) {
      return Uri.http(_host, path, query);
    } else {
      return Uri.https(_host, path, query);
    }
  }

  Map<String, String> _buildHeaders(String token) {
    return {'Authorization': 'Bearer $token'};
  }
}
