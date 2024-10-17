import 'package:flutter/material.dart';
import 'package:flutter_client/src/controllers/settings_controller.dart';
import 'package:flutter_client/src/screens/login_screen.dart';
import 'package:flutter_client/src/screens/nodes_screen.dart';
import 'package:flutter_client/src/screens/settings_screen.dart';
import 'package:flutter_client/src/services/auth_service.dart';
import 'package:flutter_client/src/widgets/loading_view.dart';
import 'package:provider/provider.dart';

class GateApp extends StatelessWidget {
  const GateApp({super.key});

  @override
  Widget build(BuildContext context) {
    final settingsController = Provider.of<SettingsController>(context);

    return FutureBuilder(
      future: settingsController.loadSettings(),
      builder: (context, snapshot) {
        if (settingsController.isInitialized) {
          return AnimatedBuilder(
            animation: settingsController,
            builder: (context, child) => MaterialApp(
              restorationScopeId: 'app',
              theme: ThemeData(),
              darkTheme: ThemeData.dark(),
              themeMode: settingsController.themeMode,
              onGenerateRoute: (routeSettings) => MaterialPageRoute<void>(
                settings: routeSettings,
                builder: (context) {
                  if (AuthService.isLoggedIn()) {
                    return _unrestrictedRouteSettings(context, routeSettings.name);
                  }

                  return _restrictedRouteSettings(context, routeSettings.name);
                },
              ),
            ),
          );
        }

        return const MaterialApp(
          home: Scaffold(body: LoadingView(message: 'Initializing')),
        );
      },
    );
  }

  Widget _restrictedRouteSettings(BuildContext context, String? routeName) {
    switch (routeName) {
      case SettingsScreen.route:
        return const SettingsScreen();
      default:
        return const LoginScreen();
    }
  }

  Widget _unrestrictedRouteSettings(BuildContext context, String? routeName) {
    switch (routeName) {
      case SettingsScreen.route:
        return const SettingsScreen();
      case LoginScreen.route:
        return const LoginScreen();
      default:
        return const NodesScreen();
    }
  }
}
