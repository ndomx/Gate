import 'package:flutter/material.dart';
import 'package:flutter_client/src/services/auth_service.dart';
import 'package:flutter_client/src/services/prefs_service.dart';
import 'package:package_info_plus/package_info_plus.dart';

class SettingsController with ChangeNotifier {
  late ThemeMode _themeMode;
  ThemeMode get themeMode => _themeMode;

  late bool _requireAuth;
  bool get requireAuth => _requireAuth;

  late String _appName;
  String get appName => _appName;

  late String _appVersion;
  String get appVersion => _appVersion;

  final _prefsService = PrefsService();

  final _themeKey = 'key_theme';
  final _requireAuthKey = 'key_require_auth';

  Future<void> loadSettings() async {
    await _loadRequireAuthSetting();
    await _loadThemeModeSetting();

    final packageInfo = await PackageInfo.fromPlatform();
    _appName = packageInfo.appName;
    _appVersion = packageInfo.version;

    notifyListeners();
  }

  Future<void> updateThemeMode(ThemeMode? newThemeMode) async {
    if (newThemeMode == null) {
      return;
    }

    if (newThemeMode == _themeMode) {
      return;
    }

    _themeMode = newThemeMode;
    notifyListeners();

    await _prefsService.save(_themeKey, newThemeMode.index);
  }

  Future<void> updateRequireAuth(bool? requireAuth) async {
    if (requireAuth == null) {
      return;
    }

    if (requireAuth == _requireAuth) {
      return;
    }

    _requireAuth = requireAuth;
    notifyListeners();

    await _prefsService.save(_requireAuthKey, requireAuth);
  }

  Future<void> logout() async {
    await _prefsService.deleteEncrypted();
    await AuthService.signOut();
  }

  Future<void> _loadThemeModeSetting() async {
    int? index = await _prefsService.load(_themeKey);
    _themeMode = index == null ? ThemeMode.system : ThemeMode.values[index];
  }

  Future<void> _loadRequireAuthSetting() async {
    bool? requireAuth = await _prefsService.load(_requireAuthKey);
    _requireAuth = ((requireAuth == null)) || requireAuth;
  }
}
