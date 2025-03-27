import 'package:flutter/material.dart';
import 'package:flutter_client/src/controllers/nodes_controller.dart';
import 'package:flutter_client/src/widgets/menus/main_menu.dart';
import 'package:flutter_client/src/widgets/home_empty_view.dart';
import 'package:flutter_client/src/widgets/nodes/node_list_widget.dart';
import 'package:provider/provider.dart';

class NodesScreen extends StatelessWidget {
  const NodesScreen({super.key});

  static const route = '/';

  @override
  Widget build(BuildContext context) {
    final controller = NodesController();

    return ChangeNotifierProvider(
      create: (context) => controller..fetchNodes(),
      child: Scaffold(
        appBar: AppBar(
          title: const Text('Gate'),
          actions: [
            IconButton(
              onPressed: () => controller.fetchNodes(),
              icon: const Icon(Icons.refresh),
            ),
            const MainMenu(),
          ],
        ),
        body: Consumer<NodesController>(
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
      ),
    );
  }
}
