import 'package:flutter/material.dart';
import 'package:flutter_client/src/screens/settings_screen.dart';

enum MainMenuItem { settings }

class MainMenu extends StatelessWidget {
  const MainMenu({super.key});

  @override
  Widget build(BuildContext context) {
    return PopupMenuButton(
      itemBuilder: (context) => const [
        PopupMenuItem(
          value: MainMenuItem.settings,
          child: Text('Settings'),
        ),
      ],
      onSelected: (item) => _onItemSelected(context, item),
    );
  }

  Future<void> _onItemSelected(BuildContext context, MainMenuItem item) async {
    switch (item) {
      case MainMenuItem.settings:
        Navigator.pushNamed(context, SettingsScreen.route);
        break;
    }
  }
}
