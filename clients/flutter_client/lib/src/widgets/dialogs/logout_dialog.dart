import 'package:flutter/material.dart';

class LogoutDialog extends StatelessWidget {
  const LogoutDialog({super.key, required this.onConfirm});

  final Future<void> Function() onConfirm;

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: const Text('Log out?'),
      content: const Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text('This will log you out of the platform and delete all data'),
          SizedBox(
            height: 10,
          ),
          Row(
            children: [
              Icon(
                Icons.warning_amber_outlined,
                color: Colors.amberAccent,
              ),
              SizedBox(
                width: 5,
              ),
              Expanded(
                child: Text('Warning: this action cannot be undone'),
              ),
            ],
          ),
        ],
      ),
      actions: [
        TextButton(
          onPressed: () {
            Navigator.pop(context);
          },
          child: const Text('Cancel'),
        ),
        TextButton(
          onPressed: () async {
            Navigator.pop(context);
            await onConfirm();
          },
          child: const Text(
            'Confirm',
            style: TextStyle(color: Colors.redAccent),
          ),
        ),
      ],
    );
  }
}
