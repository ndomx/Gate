import 'package:flutter/material.dart';

class LoadingView extends StatelessWidget {
  const LoadingView({super.key, required this.message});

  final String message;

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        const Center(
            child: SizedBox(
          height: 60,
          width: 60,
          child: CircularProgressIndicator(value: null),
        )),
        const SizedBox(
          height: 30,
        ),
        Text(
          message,
          textAlign: TextAlign.center,
          style: const TextStyle(fontSize: 24),
        )
      ],
    );
  }
}
