import 'package:flutter/material.dart';
import 'package:flutter_client/src/controllers/devices_controller.dart';
import 'package:flutter_client/src/viewmodels/device_viewmodel.dart';

class DevicesView extends StatefulWidget {
  const DevicesView({super.key});

  @override
  State<DevicesView> createState() => _DevicesViewState();
}

class _DevicesViewState extends State<DevicesView> {
  final _controller = DevicesController();

  late Future<List<DeviceViewModel>?> _devices;

  @override
  void initState() {
    super.initState();

    _devices = _controller.loadDevices();
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      builder: (context, snapshot) {
        switch (snapshot.connectionState) {
          case ConnectionState.waiting:
            return _loadingWidget(context);
          case ConnectionState.done:
            if (snapshot.hasError) {
              return _errorWidget(context);
            }

            final devices = snapshot.data;
            if (devices == null) {
              return _errorWidget(context);
            }

            return _deviceListWidget(context, devices);

          default:
            return _loadingWidget(context);
        }
      },
      future: _devices,
    );
  }

  Widget _deviceListWidget(
      BuildContext context, List<DeviceViewModel> devices) {
    if (devices.isEmpty) {
      return const Text('No devices found');
    }

    return ListView.builder(
      itemBuilder: (context, index) => ListTile(
        title: Text(devices[index].node.name,
            style: const TextStyle(fontSize: 28)),
        trailing: const CircleAvatar(
          child: Icon(Icons.lock_outline),
        ),
        onTap: () => _controller.requestAccess(devices[index]),
      ),
      itemCount: devices.length,
    );
  }

  Widget _loadingWidget(BuildContext context) {
    return const Text('Loading...');
  }

  Widget _errorWidget(BuildContext context) {
    return const Text('error');
  }
}
