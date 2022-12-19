import 'package:flutter/material.dart';
import 'package:flutter_client/src/services/settings_service.dart';

class SettingsController with ChangeNotifier {
  SettingsController(this._settingsService);

  final SettingsService _settingsService;

  late ThemeMode _themeMode;
  ThemeMode get themeMode => _themeMode;

  late bool _requireAuth;
  bool get requireAuth => _requireAuth;

  Future<void> loadSettings() async {
    _themeMode = await _settingsService.themeMode();
    _requireAuth = await _settingsService.requireAuth();

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

    await _settingsService.updateThemeMode(newThemeMode);
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

    await _settingsService.updateAuthRequired(requireAuth);
  }
}
