import 'package:flutter/services.dart';
import 'package:local_auth/local_auth.dart';

class AuthService {
  static final _instance = AuthService._internal();

  factory AuthService() {
    return _instance;
  }

  AuthService._internal();

  final _auth = LocalAuthentication();

  Future<bool> _canAuthenticate() async {
    final canCheckBiometrics = await _auth.canCheckBiometrics;
    final isDeviceSupported = await _auth.isDeviceSupported();
    return (canCheckBiometrics || isDeviceSupported);
  }

  // TODO: if user does not have any auth enrolled, should use internal auth
  Future<bool> authenticate() async {
    final canAuthenticate = await _canAuthenticate();
    if (!canAuthenticate) {
      return true;
    }

    final availableBiometrics = await _auth.getAvailableBiometrics();
    if (availableBiometrics.isEmpty) {
      return true;
    }

    bool authResult = false;
    try {
      authResult = await _auth.authenticate(
          localizedReason: 'Please authenticate to request access');
    } on PlatformException {
      authResult = false;
    }

    return authResult;
  }
}
