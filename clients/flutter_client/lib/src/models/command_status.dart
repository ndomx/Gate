class CommandStatus {
  const CommandStatus({
    required this.pending,
    required this.startedAt,
    required this.responseCode,
    required this.timeout,
  });

  final bool pending;
  final int startedAt;
  final int? responseCode;
  final int timeout;

  factory CommandStatus.fromJson(Map<String, dynamic> json) {
    return CommandStatus(
      pending: json['pending'],
      startedAt: json['startedAt'],
      responseCode: json['responseCode'],
      timeout: json['timeout'],
    );
  }

  Map<String, dynamic> toJson() => {
        'pending': pending,
        'startedAt': startedAt,
        'responseCode': responseCode,
        'timeout': timeout,
      };
}
