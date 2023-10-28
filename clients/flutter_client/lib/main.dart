import 'package:flutter/material.dart';
import 'package:flutter_client/src/controllers/settings_controller.dart';
import 'package:flutter_client/src/gate_app.dart';
import 'package:flutter_client/src/services/settings_service.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

Future main() async {
  WidgetsFlutterBinding.ensureInitialized();

  await dotenv.load();

  final settingsController = SettingsController(SettingsService());
  await settingsController.loadSettings();

  runApp(GateApp(settingsController: settingsController));
}
