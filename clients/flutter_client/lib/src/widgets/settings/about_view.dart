import 'package:flutter/material.dart';
import 'package:flutter_client/src/common/constants.dart';
import 'package:flutter_client/src/common/utils.dart';

class AboutView extends StatelessWidget {
  const AboutView({
    super.key,
    required this.appName,
    required this.appVersion,
  });

  final String appName;
  final String appVersion;

  @override
  Widget build(BuildContext context) {
    return ListTile(
      title: const Text('About'),
      leading: const Icon(Icons.info_outline),
      onTap: () {
        showAboutDialog(
          context: context,
          applicationName: appName,
          applicationVersion: appVersion,
          children: [
            const Text(
              'This app is fully open source. Check the Github repository '
              'to find the source code for all apps in the Gate ecosystem.',
              textAlign: TextAlign.justify,
            ),
            const SizedBox(
              height: 10,
            ),
            ListTile(
              leading: const Icon(Icons.code),
              title: const Text(
                githubRepoUrl,
                style: TextStyle(color: Colors.blue, decoration: TextDecoration.underline),
              ),
              onTap: () => followLink(githubRepoUrl),
            ),
          ],
        );
      },
    );
  }
}
