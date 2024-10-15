import 'package:flutter/material.dart';
import 'package:flutter_client/src/controllers/settings_controller.dart';

class RequireAuthSettingView extends StatelessWidget {
  const RequireAuthSettingView(
    this.controller, {
    super.key,
  });

  final SettingsController controller;

  @override
  Widget build(BuildContext context) {
    return CheckboxListTile(
      value: controller.requireAuth,
      onChanged: controller.updateRequireAuth,
      title: const Text('Require authentication'),
    );
  }
}
