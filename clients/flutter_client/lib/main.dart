import 'package:flutter/material.dart';
import 'package:flutter_client/src/controllers/settings_controller.dart';
import 'package:flutter_client/src/gate_app.dart';
import 'package:flutter_client/src/models/node.dart';
import 'package:flutter_client/src/services/settings_service.dart';
import 'package:flutter_client/src/widgets/node_card.dart';
import 'package:flutter_client/src/widgets/node_list_widget.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

Future main() async {
  // WidgetsFlutterBinding.ensureInitialized();
  //
  // await dotenv.load();
  //
  // final settingsController = SettingsController(SettingsService());
  // await settingsController.loadSettings();
  //
  // runApp(GateApp(settingsController: settingsController));

  runApp(const PreviewWidget());
}

class PreviewWidget extends StatelessWidget {
  const PreviewWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: Scaffold(
          body: NodeListWidget(nodes: [
        Node(
          id: '1',
          name: 'device_1',
          displayName: 'Device 1',
          actionCode: 'on/off',
          deviceId: '23847',
        ),
        Node(
          id: '2',
          name: 'device_2',
          displayName: 'Device 2',
          actionCode: 'on/off',
          deviceId: '23847',
        ),
      ])),
    );
  }
}
