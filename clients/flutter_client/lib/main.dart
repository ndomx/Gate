import 'package:flutter/material.dart';
import 'package:flutter_client/src/controllers/login_controller.dart';
import 'package:flutter_client/src/controllers/settings_controller.dart';
import 'package:flutter_client/src/gate_app.dart';
import 'package:flutter_client/src/services/auth_service.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:provider/provider.dart';

Future main() async {
  WidgetsFlutterBinding.ensureInitialized();

  await dotenv.load();
  await AuthService.initialize();

  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => SettingsController()),
        ChangeNotifierProvider(create: (_) => LoginController()),
      ],
      child: const GateApp(),
    ),
  );
}
