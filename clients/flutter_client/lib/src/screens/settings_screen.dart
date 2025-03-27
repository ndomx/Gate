import 'package:flutter/material.dart';
import 'package:flutter_client/src/controllers/settings_controller.dart';
import 'package:flutter_client/src/services/auth_service.dart';
import 'package:flutter_client/src/widgets/settings/signed_in_settings_view.dart';
import 'package:flutter_client/src/widgets/settings/signed_out_settings_view.dart';
import 'package:provider/provider.dart';

class SettingsScreen extends StatelessWidget {
  const SettingsScreen({super.key});

  static const route = '/settings';

  @override
  Widget build(BuildContext context) {
    final SettingsController controller = Provider.of(context);

    if (AuthService.isLoggedIn()) {
      return SignedInSettingsView(settingsController: controller);
    }

    return SignedOutSettingsView(settingsController: controller);
  }
}
