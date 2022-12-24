import 'package:flutter/material.dart';
import 'package:flutter_client/src/viewmodels/device_viewmodel.dart';

class DevicesView extends StatelessWidget {
  const DevicesView(
      {super.key, required this.devices, required this.onDeviceTap});

  final List<DeviceViewModel> devices;
  final Function(BuildContext, DeviceViewModel) onDeviceTap;

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemBuilder: (context, index) => ListTile(
        title: Text(devices[index].node.name,
            style: const TextStyle(fontSize: 28)),
        trailing: CircleAvatar(
          backgroundColor: devices[index].backgroundColor,
          child: devices[index].icon,
        ),
        onTap: () => onDeviceTap(context, devices[index]),
        enabled: devices[index].isClickable,
      ),
      itemCount: devices.length,
    );
  }
}
