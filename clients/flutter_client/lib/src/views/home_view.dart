import 'package:flutter/material.dart';
import 'package:flutter_client/src/views/login_view.dart';
import 'package:flutter_client/src/views/settings_view.dart';

enum MenuItem { login, settings }

class HomeView extends StatelessWidget {
  const HomeView({super.key});

  static const routeName = '/';

  void _onMenuItemSelected(BuildContext context, MenuItem item) {
    switch (item) {
      case MenuItem.login:
        Navigator.restorablePushNamed(context, LoginView.routeName);
        break;
      case MenuItem.settings:
        Navigator.restorablePushNamed(context, SettingsView.routeName);
        break;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Gate'),
        actions: [
          PopupMenuButton(
            itemBuilder: ((context) => const [
                  PopupMenuItem<MenuItem>(
                    value: MenuItem.login,
                    child: Text('Login'),
                  ),
                  PopupMenuItem<MenuItem>(
                    value: MenuItem.settings,
                    child: Text('Settings'),
                  ),
                ]),
            onSelected: (item) => _onMenuItemSelected(context, item),
          )
        ],
      ),
    );
  }
}
