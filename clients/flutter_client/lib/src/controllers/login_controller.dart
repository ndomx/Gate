import 'package:flutter/material.dart';
import 'package:flutter_client/src/services/login_service.dart';

class LoginController {
  final loginService = LoginService();

  Future<String?> onLoginButtonPress(String username, String password) async {
    FocusManager.instance.primaryFocus?.unfocus();

    final loginResponse = await loginService.loginAndSaveCredentials(username, password);
    if (loginResponse == null) {
      return null;
    }

    return loginResponse.token;
  }
}
