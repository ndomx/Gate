import 'package:flutter/material.dart';
import 'package:flutter_client/src/controllers/devices_controller.dart';
import 'package:flutter_client/src/viewmodels/device_viewmodel.dart';
import 'package:flutter_client/src/widgets/devices_view.dart';
import 'package:flutter_client/src/widgets/home_empty_view.dart';
import 'package:flutter_client/src/views/login_view.dart';
import 'package:flutter_client/src/views/settings_view.dart';
import 'package:flutter_client/src/widgets/loading_view.dart';

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

    _devices = _controller.loadDevicesIfLoggedIn();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Gate'),
        actions: [
          IconButton(onPressed: () => _onRefresh(context), icon: const Icon(Icons.refresh)),
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
              return const LoadingView(message: 'Loading...');

            case ConnectionState.done:
              if (snapshot.hasError) {
                return const HomeEmptyView(
                  title: 'Error loading devices',
                  secondary: 'Try again later or contact the platform admin',
                );
              }

              final devices = snapshot.data;
              if (devices == null) {
                return const HomeEmptyView(
                  title: 'Error loading devices',
                  secondary: 'Try again later or contact the platform admin',
                );
              }

              if (devices.isEmpty) {
                return const HomeEmptyView(
                  title: 'No devices found',
                  secondary: 'Make sure you are logged in',
                );
              }

              return DevicesView(
                devices: devices,
                onDeviceTap: _onDeviceTap,
              );

            default:
              return const LoadingView(message: 'Loading...');
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
        _goToSettingsScreen(context);
        break;
    }
  }

  Future<void> _goToLoginScreen(BuildContext context) async {
    final refresh = await Navigator.push<bool?>(context, MaterialPageRoute(builder: (context) => LoginView()));

    if ((refresh == true) && mounted) {
      ScaffoldMessenger.of(context)
        ..hideCurrentSnackBar()
        ..showSnackBar(const SnackBar(content: Text('Successfully logged in')));
      _onRefresh(context);
    }
  }

  Future<void> _goToSettingsScreen(BuildContext context) async {
    await Navigator.pushNamed(context, SettingsView.routeName);

    if (!mounted) {
      return;
    }

    setState(() {
      _devices = _controller.loadDevicesIfLoggedIn();
    });
  }

  void _onRefresh(BuildContext context) {
    setState(() {
      _devices = _controller.refreshData();
    });
  }

  Future<void> _onDeviceTap(BuildContext context, int index) async {
    List<DeviceViewModel> devices;

    devices = await _setDeviceState(index, DeviceState.waiting);

    final accessGranted = await _controller.requestAccess(devices[index]);
    if (accessGranted) {
      await _onRequestAccessSuccess(index);
    } else {
      await _onRequestAccessFailure(index);
    }
  }

  Future<void> _onRequestAccessSuccess(int index) async {
    final devices = await _devices;
    final responseCode = await _controller.startPolling(devices[index]);
  
    if (responseCode != 0) {
      return _onRequestAccessFailure(index);
    }

    await _setDeviceState(index, DeviceState.success);
    await Future.delayed(const Duration(seconds: DeviceViewModel.successAnimationDuration));

    await _setDeviceState(index, DeviceState.idle);
  }

  Future<void> _onRequestAccessFailure(int index) async {
    await _setDeviceState(index, DeviceState.failure);
    await Future.delayed(const Duration(seconds: DeviceViewModel.failureAnimationDuration));

    await _setDeviceState(index, DeviceState.idle);
  }

  Future<List<DeviceViewModel>> _setDeviceState(int index, DeviceState state) async {
    final devices = await _devices;
    devices[index].state = state;

    setState(() {
      _devices = Future.value(devices);
    });

    return devices;
  }
}
