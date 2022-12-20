import 'package:flutter/material.dart';
import 'package:flutter_client/src/controllers/settings_controller.dart';
import 'package:flutter_client/src/views/home_view.dart';
import 'package:flutter_client/src/views/login_view.dart';
import 'package:flutter_client/src/views/settings_view.dart';

class GateApp extends StatelessWidget {
  const GateApp({super.key, required this.settingsController});

  final SettingsController settingsController;

  @override
  Widget build(BuildContext context) {
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
            switch (routeSettings.name) {
              case HomeView.routeName:
                return const HomeView();
              case SettingsView.routeName:
                return SettingsView(controller: settingsController);
              case LoginView.routeName:
                return LoginView();
              default:
                return const HomeView();
            }
          },
        ),
      ),
    );
  }
}
