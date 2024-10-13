import 'package:flutter/material.dart';
import 'package:flutter_client/src/common/constants.dart';
import 'package:flutter_client/src/common/utils.dart';
import 'package:flutter_client/src/controllers/settings_controller.dart';
import 'package:flutter_client/src/screens/login_screen.dart';
import 'package:flutter_client/src/widgets/dialogs/logout_dialog.dart';
import 'package:flutter_client/src/widgets/menus/theme_menu.dart';
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
          return Scaffold(
            appBar: AppBar(title: const Text('Settings')),
            body: Column(
              children: [
                ThemeSettings(controller: value),
                RequireAuthSettings(controller: value),
                AboutWidget(
                  appName: value.appName,
                  appVersion: value.appVersion,
                ),
              ],
            ),
            bottomNavigationBar: LogoutButton(
              controller: value,
            ),
          );
        },
      ),
    );
  }
}

class ThemeSettings extends StatelessWidget {
  const ThemeSettings({
    super.key,
    required this.controller,
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

class RequireAuthSettings extends StatelessWidget {
  const RequireAuthSettings({
    super.key,
    required this.controller,
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

class LogoutButton extends StatelessWidget {
  const LogoutButton({super.key, required this.controller});

  final SettingsController controller;

  @override
  Widget build(BuildContext context) {
    return TextButton(
      onPressed: () => _showDialog(context),
      style: ButtonStyle(
        backgroundColor: MaterialStateProperty.all(Theme.of(context).cardColor),
      ),
      child: const Text(
        'Log out',
        style: TextStyle(
          color: Colors.redAccent,
          fontSize: 24,
        ),
      ),
    );
  }

  void _showDialog(context) {
    showDialog(
      context: context,
      builder: (context) => LogoutDialog(
        onConfirm: () => _onConfirm(context),
      ),
    );
  }

  Future<void> _onConfirm(BuildContext context) async {
    final localContext = context;

    await controller.logout();

    if (localContext.mounted) {
      Navigator.pushNamed(localContext, LoginScreen.route);
    }
  }
}

class AboutWidget extends StatelessWidget {
  const AboutWidget({
    super.key,
    required this.appName,
    required this.appVersion,
  });

  final String appName;
  final String appVersion;

  @override
  Widget build(BuildContext context) {
    return ListTile(
      title: const Text('About'),
      leading: const Icon(Icons.info_outline),
      onTap: () {
        showAboutDialog(
          context: context,
          applicationName: appName,
          applicationVersion: appVersion,
          children: [
            const Text(
              'This app is fully open source. Check the Github repository '
              'to find the source code for all apps in the Gate ecosystem.',
              textAlign: TextAlign.justify,
            ),
            const SizedBox(
              height: 10,
            ),
            ListTile(
              leading: const Icon(Icons.code),
              title: const Text(
                githubRepoUrl,
                style: TextStyle(color: Colors.blue, decoration: TextDecoration.underline),
              ),
              onTap: () => followLink(githubRepoUrl),
            ),
          ],
        );
      },
    );
  }
}
