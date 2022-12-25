import 'package:flutter/material.dart';
import 'package:flutter_client/src/controllers/settings_controller.dart';

class SettingsView extends StatelessWidget {
  const SettingsView({super.key, required this.controller});

  static const routeName = '/settings';

  final SettingsController controller;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Settings'),
      ),
      body: Column(
        children: [
          ListTile(
            title: const Text('Theme'),
            trailing: DropdownButton<ThemeMode>(
              value: controller.themeMode,
              onChanged: controller.updateThemeMode,
              items: const [
                DropdownMenuItem(
                    value: ThemeMode.system, child: Text('System Theme')),
                DropdownMenuItem(
                    value: ThemeMode.light, child: Text('Light Theme')),
                DropdownMenuItem(
                    value: ThemeMode.dark, child: Text('Dark Theme')),
              ],
            ),
          ),
          CheckboxListTile(
            value: controller.requireAuth,
            onChanged: controller.updateRequireAuth,
            title: const Text('Require authentication'),
          ),
        ],
      ),
      bottomNavigationBar: TextButton(
          onPressed: () {
            print('press');
          },
          style: ButtonStyle(
              backgroundColor:
                  MaterialStateProperty.all(Theme.of(context).cardColor)),
          child: const Text(
            'Log out',
            style: TextStyle(color: Colors.redAccent, fontSize: 24),
          )),
    );
  }
}
