import 'package:flutter/material.dart';
import 'package:flutter_client/src/controllers/settings_controller.dart';
import 'package:flutter_client/src/widgets/menus/theme_menu.dart';

class ThemeSettingView extends StatelessWidget {
  const ThemeSettingView(
    this.controller, {
    super.key,
  });

  final SettingsController controller;

  @override
  Widget build(BuildContext context) {
    return ListTile(
      title: const Text('Theme'),
      trailing: ThemeMenu(controller: controller),
    );
  }
}
