import 'package:flutter/material.dart';
import 'package:flutter_client/src/services/auth_service.dart';

class LoginController with ChangeNotifier {
  bool get isLoading => _isLoading;

  bool _isLoading = false;

  Future<bool> login(String email, String password) async {
    if (_isLoading) {
      return false;
    }

    _setLoading(true);
    final success = await AuthService.signIn(email, password);

    _setLoading(false);
    return success;
  }

  void _setLoading(bool value) {
    _isLoading = value;
    notifyListeners();
  }
}
