import 'package:flutter/material.dart';
import 'package:flutter_client/src/models/access_status.dart';

class AccessIcon extends StatelessWidget {
  const AccessIcon({super.key, required this.status});

  final AccessStatus status;

  @override
  Widget build(BuildContext context) {
    switch (status) {
      case AccessStatus.idle:
        return const IdleIcon();
      case AccessStatus.loading:
        return const LoadingIcon();
      case AccessStatus.accessGranted:
        return const AccessGrantedIcon();
      case AccessStatus.accessRejected:
        return const AccessDeniedIcon();
    }
  }
}

class IdleIcon extends StatelessWidget {
  const IdleIcon({super.key});

  @override
  Widget build(BuildContext context) {
    return const CircleAvatar(
      backgroundColor: Colors.deepPurple,
      child: Icon(Icons.chevron_right),
    );
  }
}

class LoadingIcon extends StatelessWidget {
  const LoadingIcon({super.key});

  @override
  Widget build(BuildContext context) {
    return const CircleAvatar(
      backgroundColor: Colors.deepPurple,
      child: Stack(
        alignment: AlignmentDirectional.center,
        children: [
          CircularProgressIndicator(
            value: null,
          ),
          Icon(Icons.chevron_right),
        ],
      ),
    );
  }
}

class AccessGrantedIcon extends StatelessWidget {
  const AccessGrantedIcon({super.key});

  @override
  Widget build(BuildContext context) {
    return const CircleAvatar(
      backgroundColor: Colors.green,
      child: Icon(Icons.lock_open),
    );
  }
}

class AccessDeniedIcon extends StatelessWidget {
  const AccessDeniedIcon({super.key});

  @override
  Widget build(BuildContext context) {
    return const CircleAvatar(
      backgroundColor: Colors.red,
      child: Icon(Icons.lock),
    );
  }
}
