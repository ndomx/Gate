import 'package:flutter/material.dart';
import 'package:flutter_client/src/common/constants.dart';
import 'package:flutter_client/src/common/utils.dart';

class AboutDialog extends StatelessWidget {
  const AboutDialog({super.key});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        const Text(
          'This app is fully open source. Check the Github repository '
          'to find the source code for all apps in the Gate ecosystem.',
          textAlign: TextAlign.justify,
        ),
        const SizedBox(
          height: 10,
        ),
        GestureDetector(
          child: const Text(
            githubRepoUrl,
            style: TextStyle(color: Colors.blue, decoration: TextDecoration.underline),
          ),
          onTap: () => followLink(githubRepoUrl),
        ),
      ],
    );
  }
}
