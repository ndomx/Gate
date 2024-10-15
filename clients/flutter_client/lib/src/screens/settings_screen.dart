import 'package:flutter/material.dart';
import 'package:flutter_client/src/controllers/settings_controller.dart';
import 'package:flutter_client/src/services/auth_service.dart';
import 'package:flutter_client/src/widgets/settings/signed_in_settings_view.dart';
import 'package:flutter_client/src/widgets/settings/signed_out_settings_view.dart';
import 'package:provider/provider.dart';

class SettingsScreen extends StatelessWidget {
  final SettingsController controller;

  const SettingsScreen({super.key, required this.controller});

  static const route = '/settings';

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => controller,
      child: Consumer<SettingsController>(
        builder: (context, value, child) {
          if (AuthService.isLoggedIn()) {
            return SignedInSettingsView(settingsController: value);
          }

          return SignedOutSettingsView(settingsController: value);
        },
      ),
    );
  }
}
