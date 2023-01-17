import 'package:flutter/material.dart';

class HomeEmptyView extends StatelessWidget {
  const HomeEmptyView(
      {super.key, required this.title, required this.secondary});

  final String title;
  final String secondary;

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Text(
          title,
          style: const TextStyle(fontSize: 30),
          textAlign: TextAlign.center,
        ),
        Text(
          secondary,
          textAlign: TextAlign.center,
        )
      ],
    );
  }
}
