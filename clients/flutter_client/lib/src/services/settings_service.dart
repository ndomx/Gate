import 'package:flutter/material.dart';
import 'package:flutter_client/src/db/gate_database.dart';
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
    return ((isRequired == null) || isRequired);
  }

  Future<void> updateThemeMode(ThemeMode mode) async {
    await PrefsService.save<int>(PrefsService.themeKey, mode.index);
  }

  Future<void> updateAuthRequired(bool requireAuth) async {
    await PrefsService.save<bool>(PrefsService.requireAuthKey, requireAuth);
  }

  Future<void> deletePrefs() async {
    await PrefsService.deleteEncrypted();
  }

  Future<void> deleteDevices() async {
    final db = GateDatabase();
    await db.clearDatabase();
  }
}
