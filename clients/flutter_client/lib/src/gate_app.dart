import 'package:flutter/material.dart';
import 'package:flutter_client/src/controllers/nodes_controller.dart';
import 'package:flutter_client/src/controllers/settings_controller.dart';
import 'package:flutter_client/src/screens/nodes_screen.dart';
import 'package:flutter_client/src/screens/settings_screen.dart';

class GateApp extends StatelessWidget {
  const GateApp(
    this.settingsController,
    this.nodesController, {
    super.key,
  });

  final SettingsController settingsController;
  final NodesController nodesController;

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
              case SettingsScreen.route:
                return SettingsScreen(controller: settingsController);
              default:
                return NodesScreen(
                  controller: nodesController,
                );
            }
          },
        ),
      ),
    );
  }
}
