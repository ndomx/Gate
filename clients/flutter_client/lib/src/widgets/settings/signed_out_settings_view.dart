import 'package:flutter/material.dart';
import 'package:flutter_client/src/controllers/settings_controller.dart';
import 'package:flutter_client/src/widgets/settings/about_view.dart';
import 'package:flutter_client/src/widgets/settings/theme_setting_view.dart';

class SignedOutSettingsView extends StatelessWidget {
  const SignedOutSettingsView({
    super.key,
    required this.settingsController,
  });

  final SettingsController settingsController;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Settings'),
      ),
      body: Column(children: [
        ThemeSettingView(settingsController),
        AboutView(
          appName: settingsController.appName,
          appVersion: settingsController.appVersion,
        ),
      ]),
    );
  }
}
