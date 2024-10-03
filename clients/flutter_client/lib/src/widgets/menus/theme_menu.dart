import 'package:flutter/material.dart';
import 'package:flutter_client/src/controllers/settings_controller.dart';

class ThemeMenu extends StatelessWidget {
  const ThemeMenu({super.key, required this.controller});

  final SettingsController controller;

  @override
  Widget build(BuildContext context) {
    return DropdownButton<ThemeMode>(
      onChanged: controller.updateThemeMode,
      value: controller.themeMode,
      items: const [
        DropdownMenuItem(value: ThemeMode.system, child: Text('System Theme')),
        DropdownMenuItem(value: ThemeMode.light, child: Text('Light Theme')),
        DropdownMenuItem(value: ThemeMode.dark, child: Text('Dark Theme')),
      ],
    );
  }
}
