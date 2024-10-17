import 'package:flutter/material.dart';
import 'package:flutter_client/src/controllers/login_controller.dart';
import 'package:flutter_client/src/screens/nodes_screen.dart';
import 'package:flutter_client/src/widgets/forms/email_text_field.dart';
import 'package:flutter_client/src/widgets/forms/password_text_field.dart';
import 'package:flutter_client/src/widgets/menus/main_menu.dart';
import 'package:provider/provider.dart';

class LoginScreen extends StatelessWidget {
  const LoginScreen({super.key});

  static const route = '/login';

  @override
  Widget build(BuildContext context) {
    final LoginController controller = Provider.of(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Login'),
        actions: const [
          MainMenu(),
        ],
      ),
      body: LoginScreenBody(controller),
    );
  }
}

class LoginScreenBody extends StatelessWidget {
  const LoginScreenBody(
    this.controller, {
    super.key,
  });

  final LoginController controller;

  @override
  Widget build(BuildContext context) {
    final emailController = TextEditingController();
    final passwordController = TextEditingController();

    return Padding(
      padding: const EdgeInsets.all(16),
      child: Form(
        child: Column(
          children: [
            const Text(
              'Login to your account',
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 30),
            EmailTextField(
              controller: emailController,
              enabled: !controller.isLoading,
            ),
            const SizedBox(height: 20),
            PasswordTextField(
              controller: passwordController,
              enabled: !controller.isLoading,
            ),
            const SizedBox(height: 30),
            LoadingButton(
              isLoading: controller.isLoading,
              onPressed: () {
                controller.login(emailController.text, passwordController.text).then((value) {
                  if (value) {
                    _onLoginSuccess(context);
                  } else {
                    _onLoginFailed(context);
                  }
                });
              },
            ),
          ],
        ),
      ),
    );
  }

  void _onLoginFailed(BuildContext context) {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Unable to sign in'),
      ),
    );
  }

  void _onLoginSuccess(BuildContext context) {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Successfully logged in'),
      ),
    );

    Navigator.pushReplacementNamed(context, NodesScreen.route);
  }
}

class LoadingButton extends StatelessWidget {
  const LoadingButton({
    super.key,
    required this.isLoading,
    required this.onPressed,
  });

  final bool isLoading;
  final Function onPressed;

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: () => isLoading ? null : onPressed(),
      style: ElevatedButton.styleFrom(
        padding: const EdgeInsets.only(bottom: 15, top: 10, left: 5, right: 5),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
        backgroundColor: Colors.blue,
        elevation: 5,
      ),
      child: Column(children: [
        LinearProgressIndicator(
          value: isLoading ? null : 1,
          backgroundColor: Colors.blue.shade100,
          valueColor: const AlwaysStoppedAnimation<Color>(Colors.blue),
        ),
        const Text(
          'Login',
          style: TextStyle(fontSize: 18, color: Colors.white),
        ),
      ]),
    );
  }
}
