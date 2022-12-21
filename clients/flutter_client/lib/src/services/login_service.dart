import 'package:flutter_client/src/db/entities/node_entity.dart';
import 'package:flutter_client/src/db/gate_database.dart';
import 'package:flutter_client/src/http/dtos/response/login_response_dto.dart';
import 'package:flutter_client/src/http/dtos/response/user_nodes_response_dto.dart';
import 'package:flutter_client/src/http/gate_client.dart';
import 'package:flutter_client/src/services/prefs_service.dart';

class LoginService {
  Future<LoginResponseDto?> loginAndSaveCredentials(
      String username, String password, String server) async {
    final client = GateClient();
    final res = await client.login(server, username, password);
    if (res == null) {
      return null;
    }

    await PrefsService.save<String>(PrefsService.hostUrlKey, server,
        encrypt: true);
    await PrefsService.save<String>(PrefsService.accessTokenKey, res.token,
        encrypt: false);

    return res;
  }

  Future<UserNodesResponseDto?> fetchAndSaveNodes() async {
    final host = await PrefsService.load<String>(PrefsService.hostUrlKey,
        encrypted: true);
    if (host == null) {
      return null;
    }

    final token = await PrefsService.load<String>(PrefsService.accessTokenKey,
        encrypted: false);
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
}
