class UserDto {
  final String id;
  final String rootId;
  final String name;
  final String last;
  final String username;
  final List<String> access;
  final List<String> roles;

  const UserDto(
      {required this.id,
      required this.rootId,
      required this.name,
      required this.last,
      required this.username,
      required this.access,
      required this.roles});

  factory UserDto.fromJson(Map<String, dynamic> json) {
    return UserDto(
        id: json['id'],
        rootId: json['rootId'],
        name: json['name'],
        last: json['last'],
        username: json['username'],
        access: List<String>.from(json['access']),
        roles: List<String>.from(json['roles']));
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'rootId': rootId,
      'name': name,
      'last': last,
      'username': username,
      'access': access,
      'roles': roles,
    };
  }
}
