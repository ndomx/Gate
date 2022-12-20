class NodeEntity {
  final String id;
  final String name;

  const NodeEntity({required this.id, required this.name});

  factory NodeEntity.fromJson(Map<String, dynamic> json) {
    return NodeEntity(id: json['id'], name: json['name']);
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
    };
  }
}
