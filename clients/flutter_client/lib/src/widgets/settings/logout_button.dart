import 'package:flutter/material.dart';
import 'package:flutter_client/src/controllers/settings_controller.dart';
import 'package:flutter_client/src/screens/login_screen.dart';
import 'package:flutter_client/src/widgets/dialogs/logout_dialog.dart';

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
      Navigator.popUntil(context, (route) => route.isFirst);
      Navigator.pushReplacementNamed(localContext, LoginScreen.route);
    }
  }
}
