import 'package:flutter/material.dart';
import 'package:flutter_client/src/controllers/nodes_controller.dart';
import 'package:flutter_client/src/controllers/settings_controller.dart';
import 'package:flutter_client/src/gate_app.dart';
import 'package:flutter_client/src/models/access_status.dart';
import 'package:flutter_client/src/models/nodes/node.dart';
import 'package:flutter_client/src/models/nodes/node_with_status.dart';
import 'package:flutter_client/src/screens/nodes_screen.dart';
import 'package:flutter_client/src/services/settings_service.dart';
import 'package:flutter_client/src/widgets/nodes/node_card.dart';
import 'package:flutter_client/src/widgets/nodes/node_list_widget.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:path/path.dart';
import 'package:provider/provider.dart';

Future main() async {
  // WidgetsFlutterBinding.ensureInitialized();
  //
  // await dotenv.load();
  //
  // final settingsController = SettingsController(SettingsService());
  // await settingsController.loadSettings();
  //
  // runApp(GateApp(settingsController: settingsController));

  runApp(ChangeNotifierProvider(
    create: (context) => NodesController()..fetchNodes(),
    child: const PreviewWidget(),
  ));
}

class PreviewWidget extends StatelessWidget {
  const PreviewWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: NodesScreen(),
    );
  }
}
