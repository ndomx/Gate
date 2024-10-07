import 'package:flutter/material.dart';
import 'package:flutter_client/src/controllers/login_controller.dart';
import 'package:flutter_client/src/widgets/menus/main_menu.dart';
import 'package:provider/provider.dart';

class LoginScreen extends StatelessWidget {
  final LoginController controller;
  const LoginScreen({super.key, required this.controller});

  static const route = '/login';

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => controller,
      child: Scaffold(
        appBar: AppBar(
          title: const Text('Login'),
          actions: const [
            MainMenu(),
          ],
        ),
        body: Consumer<LoginController>(
          builder: ((context, value, child) => LoginScreenBody(controller)),
        ),
      ),
    );
  }
}

class LoginScreenBody extends StatelessWidget {
  LoginScreenBody(
    this.controller, {
    super.key,
  });

  final LoginController controller;

  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(10),
      child: Form(
        child: Column(
          children: [
            TextField(
              controller: _emailController,
              decoration: const InputDecoration(
                border: OutlineInputBorder(),
                hintText: 'email',
              ),
              autocorrect: false,
              enabled: !controller.isLoading,
            ),
            TextField(
              controller: _passwordController,
              decoration: const InputDecoration(
                border: OutlineInputBorder(),
                hintText: 'password',
              ),
              obscureText: true,
              enabled: !controller.isLoading,
            ),
            LoadingButton(
              isLoading: controller.isLoading,
              onPressed: () {
                controller.login(
                  _emailController.text,
                  _passwordController.text,
                );
              },
            ),
          ],
        ),
      ),
    );
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
      onPressed: () => isLoading ? null : onPressed,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Builder(builder: (context) {
            if (isLoading) {
              return const Text(
                'Login',
                textAlign: TextAlign.center,
              );
            }

            return const CircularProgressIndicator(value: null);
          }),
        ],
      ),
    );
  }
}
