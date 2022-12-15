package com.ndomx.gate.db.models

import androidx.room.ColumnInfo
import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "nodes")
data class NodeModel(
    @PrimaryKey
    @ColumnInfo(name = "id") var id: String,
    @ColumnInfo(name = "name") var name: String,
)
