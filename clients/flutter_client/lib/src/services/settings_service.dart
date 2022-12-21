import 'package:flutter/material.dart';
import 'package:flutter_client/src/services/prefs_service.dart';

class SettingsService {
  Future<ThemeMode> themeMode() async {
    final index = await PrefsService.load<int>(PrefsService.themeKey);
    if (index == null) {
      return ThemeMode.system;
    }

    return ThemeMode.values[index];
  }

  Future<bool> requireAuth() async {
    final isRequired =
        await PrefsService.load<bool>(PrefsService.requireAuthKey);

    final token = await PrefsService.load<String>(PrefsService.accessTokenKey, encrypted: true);
    final server = await PrefsService.load<String>(PrefsService.hostUrlKey, encrypted: true);
    print(server);
    print(token);
    return ((isRequired == null) || isRequired);
  }

  Future<void> updateThemeMode(ThemeMode mode) async {
    await PrefsService.save<int>(PrefsService.themeKey, mode.index);
  }

  Future<void> updateAuthRequired(bool requireAuth) async {
    await PrefsService.save<bool>(PrefsService.requireAuthKey, requireAuth);
  }
}
