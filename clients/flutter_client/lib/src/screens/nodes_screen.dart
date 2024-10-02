import 'package:flutter/material.dart';
import 'package:flutter_client/src/controllers/nodes_controller.dart';
import 'package:flutter_client/src/screens/base_screen.dart';
import 'package:flutter_client/src/widgets/common/main_menu_button.dart';
import 'package:flutter_client/src/widgets/home_empty_view.dart';
import 'package:flutter_client/src/widgets/nodes/node_list_widget.dart';
import 'package:provider/provider.dart';

enum MenuItem { login, settings }

class NodesScreen extends StatelessWidget implements BaseScreen {
  const NodesScreen({super.key});

  @override
  String get path => '/';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Gate'),
        actions: [
          IconButton(
            onPressed: () => print('refresh'),
            icon: const Icon(Icons.refresh),
          ),
          const MainMenuButton(),
        ],
      ),
      body: Consumer<NodesController>(
        // builder: (context, provider, child) => NodeListWidget(nodes: provider.nodes),
        builder: ((context, value, child) {
          if (value.isLoading) {
            return const Center(
              child: CircularProgressIndicator(
                value: null,
              ),
            );
          }

          if (value.nodes.isEmpty) {
            return const HomeEmptyView(title: 'Empty', secondary: 'secondary');
          }

          return NodeListWidget(
            nodes: value.nodes,
            onNodeTap: (index) => value.activateNode(index),
          );
        }),
      ),
    );
  }
}
