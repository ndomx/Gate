import 'package:flutter_client/src/db/entities/node_entity.dart';
import 'package:flutter_client/src/services/login_service.dart';

class LoginController {
  final loginService = LoginService();

  Future<String?> onLoginButtonPress(
      String username, String password, String server) async {
    final loginResponse =
        await loginService.loginAndSaveCredentials(username, password, server);
    if (loginResponse == null) {
      return null;
    }

    return loginResponse.token;
  }
}
