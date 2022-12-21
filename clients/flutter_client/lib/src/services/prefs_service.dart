import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:shared_preferences/shared_preferences.dart';

class PrefsService {
  static const String accessTokenKey = 'key_access_token';
  static const String hostUrlKey = 'key_host_url';
  static const String themeKey = 'key_theme';
  static const String requireAuthKey = 'key_require_auth';

  static const _secureStorage = FlutterSecureStorage();

  static Future<void> save<T>(String key, T value,
      {bool encrypt = false}) async {
    switch (T) {
      case String:
        await _putString(key, value as String, encrypt);
        break;

      case int:
        await _putInt(key, value as int, encrypt);
        break;

      case bool:
        await _putBool(key, value as bool, encrypt);
        break;
    }
  }

  static Future<T?> load<T>(String key, {bool encrypted = false}) async {
    dynamic result;

    switch (T) {
      case String:
        result = await _getString(key, encrypted);
        break;

      case int:
        result = await _getInt(key, encrypted);
        break;

      case bool:
        result = await _getBool(key, encrypted);
        break;
    }

    return result;
  }

  static Future<void> _putString(
      String key, String value, bool encrypt) async {
        if (encrypt) {
          await _secureStorage.write(key: key, value: value);
        } else {
          final prefs = await SharedPreferences.getInstance();
          prefs.setString(key, value);
        }
      }

  static Future<void> _putInt(String key, int value, bool encrypt) async {
    if (encrypt) {
      await _secureStorage.write(key: key, value: value.toString());
    } else {
      final prefs = await SharedPreferences.getInstance();
      prefs.setInt(key, value);
    }
  }

  static Future<void> _putBool(String key, bool value, bool encrypt) async {
    if (encrypt) {
      await _secureStorage.write(key: key, value: value.toString());
    } else {
      final prefs = await SharedPreferences.getInstance();
      prefs.setBool(key, value);
    }
  }

  static Future<String?> _getString(String key, bool encrypted) async {
    if (encrypted) {
      return await _secureStorage.read(key: key);
    } else {
      final prefs = await SharedPreferences.getInstance();
      return prefs.getString(key);
    }
  }

  static Future<int?> _getInt(String key, bool encrypted) async {
    if (encrypted) {
      final str = await _secureStorage.read(key: key);
      return (str == null) ? null : int.parse(str);
    } else {
      final prefs = await SharedPreferences.getInstance();
      return prefs.getInt(key);
    }
  }

  static Future<bool?> _getBool(String key, bool encrypted) async {
    if (encrypted) {
      final str = await _secureStorage.read(key: key);
      return (str == null) ? null : (str == 'true');
    } else {
      final prefs = await SharedPreferences.getInstance();
      return prefs.getBool(key);
    }
  }
}
