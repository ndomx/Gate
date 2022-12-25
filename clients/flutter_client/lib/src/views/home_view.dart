import 'package:flutter/material.dart';
import 'package:flutter_client/src/controllers/devices_controller.dart';
import 'package:flutter_client/src/viewmodels/device_viewmodel.dart';
import 'package:flutter_client/src/widgets/devices_view.dart';
import 'package:flutter_client/src/widgets/home_default_view.dart';
import 'package:flutter_client/src/views/login_view.dart';
import 'package:flutter_client/src/views/settings_view.dart';

enum MenuItem { login, settings }

class HomeView extends StatefulWidget {
  const HomeView({super.key});

  static const routeName = '/';

  @override
  State<HomeView> createState() => _HomeViewState();
}

class _HomeViewState extends State<HomeView> {
  final _controller = DevicesController();

  late Future<List<DeviceViewModel>> _devices;

  @override
  void initState() {
    super.initState();

    _devices = _controller.loadDevices();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Gate'),
        actions: [
          IconButton(
              onPressed: () => _onRefresh(context),
              icon: const Icon(Icons.refresh)),
          PopupMenuButton(
            itemBuilder: ((context) => const [
                  PopupMenuItem<MenuItem>(
                    value: MenuItem.login,
                    child: Text('Login'),
                  ),
                  PopupMenuItem<MenuItem>(
                    value: MenuItem.settings,
                    child: Text('Settings'),
                  ),
                ]),
            onSelected: (item) => _onMenuItemSelected(context, item),
          )
        ],
      ),
      body: FutureBuilder(
        future: _devices,
        builder: (context, snapshot) {
          switch (snapshot.connectionState) {
            case ConnectionState.waiting:
              return const HomeDefaultView(message: 'Loading...');

            case ConnectionState.done:
              if (snapshot.hasError) {
                return const HomeDefaultView(message: 'Error loading devices');
              }

              final devices = snapshot.data;
              if (devices == null) {
                return const HomeDefaultView(message: 'Error loading devices');
              }

              if (devices.isEmpty) {
                return const HomeDefaultView(message: 'No devices found');
              }

              return DevicesView(
                devices: devices,
                onDeviceTap: _onDeviceTap,
              );

            default:
              return const HomeDefaultView(message: 'Loading...');
          }
        },
      ),
    );
  }

  void _onMenuItemSelected(BuildContext context, MenuItem item) {
    switch (item) {
      case MenuItem.login:
        _goToLoginScreen(context);
        break;
      case MenuItem.settings:
        Navigator.restorablePushNamed(context, SettingsView.routeName);
        break;
    }
  }

  Future<void> _goToLoginScreen(BuildContext context) async {
    final refresh = await Navigator.push<bool?>(
        context, MaterialPageRoute(builder: (context) => LoginView()));

    if ((refresh == true) && mounted) {
      ScaffoldMessenger.of(context)
        ..hideCurrentSnackBar()
        ..showSnackBar(const SnackBar(content: Text('Successfully logged in')));
      _onRefresh(context);
    }
  }

  void _onRefresh(BuildContext context) {
    setState(() {
      _devices = _controller.refreshData();
    });
  }

  Future<void> _onDeviceTap(BuildContext context, int index) async {
    List<DeviceViewModel> devices;

    devices = await _devices;
    devices[index].state = DeviceState.waiting;

    setState(() {
      _devices = Future.value(devices);
    });

    final accessGranted = await _controller.requestAccess(devices[index]);

    Duration duration;
    if (accessGranted) {
      devices[index].state = DeviceState.success;
      duration =
          const Duration(seconds: DeviceViewModel.successAnimationDuration);
    } else {
      devices[index].state = DeviceState.failure;
      duration =
          const Duration(seconds: DeviceViewModel.failureAnimationDuration);
    }

    setState(() {
      _devices = Future.value(devices);
    });

    await Future.delayed(duration);

    devices[index].state = DeviceState.idle;
    setState(() {
      _devices = Future.value(devices);
    });
  }
}
