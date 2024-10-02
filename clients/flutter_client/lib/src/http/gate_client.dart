import 'dart:convert';
import 'dart:math';

import 'package:flutter/foundation.dart';
import 'package:flutter_client/src/models/activate_device_request.dart';
import 'package:flutter_client/src/models/command_status.dart';
import 'package:flutter_client/src/models/nodes/node.dart';
import 'package:flutter_client/src/models/user.dart';
import 'package:flutter_client/src/models/user_with_nodes.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;

class GateClient {
  static final GateClient _instance = GateClient._internal();
  static final String _host = dotenv.get('GATE_BASE_URL');
  static final String _apiKey = dotenv.get('GATE_API_KEY');

  factory GateClient() {
    return _instance;
  }

  GateClient._internal();

  Future<bool> activateNode(String nodeId, ActivateDeviceRequest request) async {
    // final url = _buildUrl('/gates/$nodeId/activate');

    // http.Response res;
    // try {
    //   res = await http.post(url, headers: _buildHeaders(), body: request.toJson());
    // } catch (e) {
    //   return false;
    // }

    // return res.statusCode == 204;
    await Future.delayed(const Duration(seconds: 2));
    return Random().nextBool();
  }

  Future<CommandStatus?> getCommandStatus(String nodeId) async {
    // final url = _buildUrl('/gates/$nodeId/status');

    // http.Response res;
    // try {
    //   res = await http.get(url, headers: _buildHeaders());
    // } catch (e) {
    //   return null;
    // }

    // final json = jsonDecode(res.body) as Map<String, dynamic>;

    await Future.delayed(const Duration(seconds: 2));
    final int randomPending = Random().nextInt(100);
    final int responseCode = Random().nextBool() ? 0 : 1;

    final bool pending = randomPending < 50;
    Map<String, dynamic> json = {
      'pending': pending,
      'startedAt': 0,
      'timeout': 10000,
    };

    if (!pending) {
      json['responseCode'] = responseCode;
    }

    return CommandStatus.fromJson(json);
  }

  Future<UserWithNodes?> getUserNodes(String authId) async {
    // final url = _buildUrl('/gates/nodes/external/$authId');

    // http.Response res;
    // try {
    //   res = await http.get(url, headers: _buildHeaders());
    // } catch (e) {
    //   return null;
    // }

    // final json = jsonDecode(res.body) as Map<String, dynamic>;
    // return UserWithNodes.fromJson(json);

    await Future.delayed(const Duration(seconds: 1));
    return const UserWithNodes(
      nodes: [
        Node(
          id: '1',
          name: 'device_1',
          displayName: 'Device 1',
          actionCode: 'on/off',
          deviceId: '23847',
        ),
        Node(
          id: '2',
          name: 'device_2',
          displayName: 'Device 2',
          actionCode: 'on/off',
          deviceId: '23847',
        )
      ],
      user: User(
        id: 'id',
        externalId: 'externalId',
        access: ['access'],
      ),
    );
  }

  Uri _buildUrl(String path, [Map<String, dynamic>? query]) {
    if (kDebugMode) {
      return Uri.http(_host, path, query);
    } else {
      return Uri.https(_host, path, query);
    }
  }

  Map<String, String> _buildHeaders() {
    return {'x-api-key': _apiKey};
  }
}
