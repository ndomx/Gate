import 'package:secure_shared_preferences/secure_shared_preferences.dart';

class PrefsService {
  static const String accessTokenKey = 'key_access_token';
  static const String hostUrlKey = 'key_host_url';
  static const String themeKey = 'key_theme';
  static const String requireAuthKey = 'key_require_auth';

  static Future<void> save<T>(String key, T value,
      {bool encrypt = false}) async {
    final prefs = await SecureSharedPref.getInstance();

    if (T is String) {
      prefs.putString(key, value as String, isEncrypted: encrypt);
    } else if (T is int) {
      prefs.putInt(key, value as int, isEncrypted: encrypt);
    } else if (T is bool) {
      prefs.putBool(key, value as bool, isEncrypted: encrypt);
    }
  }

  static Future<T?> load<T>(String key, {bool encrypted = false}) async {
    final prefs = await SecureSharedPref.getInstance();

    if (T is String) {
      return prefs.getString(key, isEncrypted: encrypted) as T?;
    } else if (T is int) {
      return prefs.getString(key, isEncrypted: encrypted) as T?;
    } else if (T is bool) {
      return prefs.getString(key, isEncrypted: encrypted) as T?;
    }

    return null;
  }
}
