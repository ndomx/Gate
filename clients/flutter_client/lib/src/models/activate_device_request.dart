class ActivateDeviceRequest {
  const ActivateDeviceRequest({
    required this.action,
    required this.actionDetails,
    required this.userId,
  });

  final String action;
  final ActionDetails? actionDetails;
  final String userId;

  factory ActivateDeviceRequest.fromJson(Map<String, dynamic> json){
    return ActivateDeviceRequest(
      action: json['action'],
      actionDetails: json['actionDetails'] == null ? null : ActionDetails.fromJson(json['actionDetails']),
      userId: json['userId'],
    );
  }

  Map<String, dynamic> toJson() => {
    'action': action,
    'actionDetails': actionDetails?.toJson(),
    'userId': userId,
  };

}

class ActionDetails {
  const ActionDetails({
    required this.timeout,
  });

  final int? timeout;

  factory ActionDetails.fromJson(Map<String, dynamic> json){
    return ActionDetails(
      timeout: json['timeout'],
    );
  }

  Map<String, dynamic> toJson() => {
    'timeout': timeout,
  };

}
