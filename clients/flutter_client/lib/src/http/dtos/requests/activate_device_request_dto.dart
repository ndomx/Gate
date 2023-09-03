class ActivateDeviceRequestDto {
  final String action;
  final Map<String, dynamic>? actionDetails;

  const ActivateDeviceRequestDto({required this.action, this.actionDetails});

  factory ActivateDeviceRequestDto.fromJson(Map<String, dynamic> json) {
    final details =
        json.containsKey('actionDetails') ? json['actionDetails'] : null;
    return ActivateDeviceRequestDto(
      action: json['action'],
      actionDetails: details,
    );
  }

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{'action': action};

    if (actionDetails != null) {
      json['actionDetails'] = actionDetails;
    }

    return json;
  }
}
