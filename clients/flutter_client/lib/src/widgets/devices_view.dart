import 'package:flutter/material.dart';
import 'package:flutter_client/src/viewmodels/device_viewmodel.dart';

class DevicesView extends StatelessWidget {
  const DevicesView(
      {super.key, required this.devices, required this.onDeviceTap});

  final List<DeviceViewModel> devices;
  final Function(BuildContext, int) onDeviceTap;

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemBuilder: (context, index) => Card(
        child: ListTile(
          title: Text(devices[index].node.name,
              style: const TextStyle(fontSize: 28)),
          trailing: CircleAvatar(
            backgroundColor: devices[index].backgroundColor,
            child: devices[index].stateIcon,
          ),
          onTap: () => onDeviceTap(context, index),
          enabled: devices[index].isClickable,
          contentPadding: const EdgeInsets.all(10),
        ),
      ),
      itemCount: devices.length,
      padding: const EdgeInsets.all(5),
    );
  }
}
