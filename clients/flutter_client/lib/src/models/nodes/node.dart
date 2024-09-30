class Node {
  final String id;
  final String name;
  final String displayName;
  final String actionCode;
  final String deviceId;

  const Node({
    required this.id,
    required this.name,
    required this.displayName,
    required this.actionCode,
    required this.deviceId,
  });

  factory Node.fromJson(Map<String, dynamic> json) {
    return Node(
      id: json['id'],
      name: json['name'],
      displayName: json['displayName'],
      actionCode: json['actionCode'],
      deviceId: json['deviceId'],
    );
  }

  Map<String, String> toJson() {
    return {
      'id': id,
      'name': name,
      'displayName': displayName,
      'actionCode': actionCode,
      'deviceId': deviceId,
    };
  }
}
