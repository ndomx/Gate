import 'package:flutter/material.dart';

class HomeDefaultView extends StatelessWidget {
  const HomeDefaultView({super.key, required this.message});

  final String message;

  @override
  Widget build(BuildContext context) {
    return Text(message);
  }
}
