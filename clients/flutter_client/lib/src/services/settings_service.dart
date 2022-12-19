import 'package:flutter/material.dart';
import 'package:flutter_client/src/services/prefs_service.dart';

class SettingsService {
  Future <ThemeMode> themeMode() async {
    return ThemeMode.system;
  }

  Future<void> updateThemeMode(ThemeMode mode) async {
    await PrefsService.save<int>(PrefsService.themeKey, mode.index);
  }
}