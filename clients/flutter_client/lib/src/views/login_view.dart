import 'package:flutter/material.dart';
class LoginView extends StatelessWidget {
  LoginView({super.key});

  static const routeName = '/login';

  final usernameController = TextEditingController();
  final passwordController = TextEditingController();
  final serverController = TextEditingController();

  Future<void> _onLoginButtonClick() async {}

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
              controller: usernameController,
              decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  hintText: 'Enter your name',
                  label: Text('Username')),
              autocorrect: false,
              keyboardType: TextInputType.url,
            ),
            const SizedBox(height: 10),
            ElevatedButton(
              onPressed: _onLoginButtonClick,
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
