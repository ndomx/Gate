import 'package:flutter/material.dart';
import 'package:flutter_client/src/common/constants.dart';
import 'package:flutter_client/src/common/utils.dart';
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
                DropdownMenuItem(value: ThemeMode.system, child: Text('System Theme')),
                DropdownMenuItem(value: ThemeMode.light, child: Text('Light Theme')),
                DropdownMenuItem(value: ThemeMode.dark, child: Text('Dark Theme')),
              ],
            ),
          ),
          CheckboxListTile(
            value: controller.requireAuth,
            onChanged: controller.updateRequireAuth,
            title: const Text('Require authentication'),
          ),
          ListTile(
            title: const Text('About'),
            leading: const Icon(Icons.info_outline),
            onTap: () {
              showAboutDialog(
                  context: context,
                  applicationName: controller.appName,
                  applicationVersion: controller.appVersion,
                  children: [
                    const Text(
                      'This app is fully open source. Check the Github repository '
                      'to find the source code for all apps in the Gate ecosystem.',
                      textAlign: TextAlign.justify,
                    ),
                    const SizedBox(
                      height: 10,
                    ),
                    GestureDetector(
                      child: const Text(
                        githubRepoUrl,
                        style: TextStyle(color: Colors.blue, decoration: TextDecoration.underline),
                      ),
                      onTap: () => followLink(githubRepoUrl),
                    )
                  ]);
            },
          )
        ],
      ),
      bottomNavigationBar: TextButton(
          onPressed: () => _onLogoutPress(context),
          style: ButtonStyle(backgroundColor: MaterialStateProperty.all(Theme.of(context).cardColor)),
          child: const Text(
            'Log out',
            style: TextStyle(color: Colors.redAccent, fontSize: 24),
          )),
    );
  }

  void _onLogoutPress(BuildContext context) {
    showDialog(
        context: context,
        builder: ((context) => AlertDialog(
              title: const Text('Log out?'),
              content: const Column(mainAxisSize: MainAxisSize.min, children: [
                Text('This will log you out of the platform and delete all data'),
                SizedBox(
                  height: 10,
                ),
                Row(
                  children: [
                    Icon(
                      Icons.warning_amber_outlined,
                      color: Colors.amberAccent,
                    ),
                    SizedBox(
                      width: 5,
                    ),
                    Expanded(child: Text('Warning: this action cannot be undone'))
                  ],
                )
              ]),
              actions: [
                TextButton(
                    onPressed: () {
                      Navigator.pop(context);
                    },
                    child: const Text('Cancel')),
                TextButton(
                    onPressed: () {
                      Navigator.pop(context);
                      controller.logout().then((value) => ScaffoldMessenger.of(context)
                          .showSnackBar(const SnackBar(content: Text('Deleted all user data'))));
                    },
                    child: const Text(
                      'Confirm',
                      style: TextStyle(color: Colors.redAccent),
                    )),
              ],
            )));
  }
}
