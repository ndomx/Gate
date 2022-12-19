import 'package:flutter/foundation.dart';
import 'package:secure_shared_preferences/secure_shared_preferences.dart';

class PrefsService {
  static const String accessTokenKey = 'key_access_token';
  static const String hostUrlKey = 'key_host_url';
  static const String themeKey = 'key_theme';
  static const String requireAuthKey = 'key_require_auth';

  static Future<void> save<T>(String key, T value,
      {bool encrypt = false}) async {
    final prefs = await SecureSharedPref.getInstance();

    switch (T) {
      case String:
        prefs.putString(key, value as String, isEncrypted: encrypt);
        break;

      case int:
        prefs.putInt(key, value as int, isEncrypted: encrypt);
        break;

      case bool:
        prefs.putBool(key, value as bool, isEncrypted: encrypt);
        break;
    }
  }

  static Future<T?> load<T>(String key, {bool encrypted = false}) async {
    final prefs = await SecureSharedPref.getInstance();
    dynamic result;

    switch (T) {
      case String:
        result = prefs.getString(key, isEncrypted: encrypted);
        break;

      case int:
        result = prefs.getInt(key, isEncrypted: encrypted);
        break;

      case bool:
        result = prefs.getBool(key, isEncrypted: encrypted);
        break;
    }

    return result;
  }
}
