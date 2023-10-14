class CommandStatusDto {
  final bool pending;
  final int startedAt;
  final int? responseCode;
  final int timeout;

  const CommandStatusDto(
      {required this.pending, required this.startedAt, required this.responseCode, required this.timeout});

  factory CommandStatusDto.fromJson(Map<String, dynamic> json) {
    final code = json.containsKey('responseCode') ? json['responseCode'] : null;
    return CommandStatusDto(
        pending: json['pending'], startedAt: json['startedAt'], responseCode: code, timeout: json['timeout']);
  }

  Map<String, dynamic> toJson() {
    return {
      'pending': pending,
      'startedAt': startedAt,
      'responseCode': responseCode,
      'timeout': timeout,
    };
  }
}
