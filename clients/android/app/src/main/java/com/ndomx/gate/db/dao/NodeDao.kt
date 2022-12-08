package com.ndomx.gate.db.dao

import androidx.room.Dao
import androidx.room.Query
import com.ndomx.gate.db.models.NodeModel

@Dao
interface NodeDao {
    @Query("SELECT * FROM nodes")
    fun getAll(): List<NodeModel>
}