class User {
  const User({
    required this.id,
    required this.externalId,
    required this.access,
  });

  final String id;
  final String externalId;
  final List<String> access;

  factory User.fromJson(Map<String, dynamic> json){
    return User(
      id: json['id'],
      externalId: json['externalId'],
      access: List<String>.from(json['access']!.map((x) => x)),
    );
  }

  Map<String, dynamic> toJson() => {
    'id': id,
    'externalId': externalId,
    'access': access.map((x) => x).toList(),
  };

}
