import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:flutter_client/firebase_options.dart';
import 'package:flutter_client/src/controllers/nodes_controller.dart';
import 'package:flutter_client/src/controllers/settings_controller.dart';
import 'package:flutter_client/src/gate_app.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

Future main() async {
  WidgetsFlutterBinding.ensureInitialized();

  await dotenv.load();

  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );

  final settingsController = SettingsController();
  await settingsController.loadSettings();

  final nodesController = NodesController();

  runApp(
    GateApp(settingsController, nodesController),
  );
}
