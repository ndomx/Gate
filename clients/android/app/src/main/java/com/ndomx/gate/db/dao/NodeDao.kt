package com.ndomx.gate.db.dao

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import com.ndomx.gate.db.models.NodeModel

@Dao
interface NodeDao {
    @Query("SELECT * FROM nodes")
    fun getAll(): List<NodeModel>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insertMany(nodes: List<NodeModel>)
}