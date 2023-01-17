import 'package:flutter_client/src/db/entities/node_entity.dart';
import 'package:path/path.dart';
import 'package:sqflite/sqflite.dart';

class GateDatabase {
  static const _dbName = 'gates.db';
  static const _nodesTableName = 'nodes';

  static final GateDatabase _instance = GateDatabase._internal();

  factory GateDatabase() {
    return _instance;
  }

  GateDatabase._internal();

  Future<Database> _getDatabase() async {
    final dbPath = await getDatabasesPath();
    return openDatabase(
      join(dbPath, _dbName),
      version: 1,
      onCreate: (db, version) => db.execute(
          'CREATE TABLE $_nodesTableName(id TEXT PRIMARY KEY, name TEXT)'),
    );
  }

  Future<List<NodeEntity>> getAllNodes() async {
    final db = await _getDatabase();
    final nodes = await db.query(_nodesTableName);
    return List.from(nodes.map((item) => NodeEntity.fromJson(item)));
  }

  Future<void> insertNodes(List<NodeEntity> nodes) async {
    final db = await _getDatabase();
    for (final node in nodes) {
      await db.insert(_nodesTableName, node.toJson(),
          conflictAlgorithm: ConflictAlgorithm.replace);
    }
  }

  Future<void> clearDatabase() async {
    final db = await _getDatabase();
    db.execute('DELETE FROM $_nodesTableName');
  }
}
