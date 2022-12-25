import 'package:flutter/material.dart';
import 'package:flutter_client/src/controllers/login_controller.dart';

class LoginView extends StatelessWidget {
  LoginView({super.key});

  static const routeName = '/login';

  final _controller = LoginController();

  final usernameController = TextEditingController();
  final passwordController = TextEditingController();
  final serverController = TextEditingController();

  Future<void> _onLoginButtonClick(BuildContext context) async {
    final username = usernameController.text;
    final password = passwordController.text;
    final server = serverController.text;

    final res =
        await _controller.onLoginButtonPress(username, password, server);

    if (res == null) {
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text('Invalid credentials')));
      return;
    }

    Navigator.pop(context, true);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Login')),
      body: Padding(
        padding: const EdgeInsets.all(10),
        child: Form(
            child: Column(
          children: [
            TextField(
              controller: usernameController,
              decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  hintText: 'Enter your name',
                  label: Text('Username')),
              autocorrect: false,
            ),
            const SizedBox(height: 10),
            TextField(
              controller: passwordController,
              decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  hintText: 'Enter your password',
                  label: Text('Password')),
              obscureText: true,
            ),
            const SizedBox(height: 10),
            TextField(
              controller: serverController,
              decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  hintText: 'Enter your name',
                  label: Text('Username')),
              autocorrect: false,
              keyboardType: TextInputType.url,
            ),
            const SizedBox(height: 10),
            ElevatedButton(
              onPressed: () => _onLoginButtonClick(context),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: const [
                  Text(
                    'Login',
                    textAlign: TextAlign.center,
                  ),
                ],
              ),
            )
          ],
        )),
      ),
    );
  }
}
