import 'package:flutter/material.dart';

enum MenuItem { login, settings }

class MainMenuButton extends StatelessWidget {
  const MainMenuButton({super.key});

  @override
  Widget build(BuildContext context) {
    return PopupMenuButton(
      itemBuilder: (context) => const [
        PopupMenuItem(
          value: MenuItem.login,
          child: Text('Login'),
        ),
        PopupMenuItem(
          value: MenuItem.settings,
          child: Text('Settings'),
        ),
      ],
      onSelected: (item) => print(item),
    );
  }
}
