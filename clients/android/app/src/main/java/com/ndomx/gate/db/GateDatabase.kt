package com.ndomx.gate.db

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import com.ndomx.gate.db.dao.NodeDao
import com.ndomx.gate.db.models.NodeModel
import kotlin.concurrent.thread

@Database(entities = [NodeModel::class], version = 1, exportSchema = true)
abstract class GateDatabase : RoomDatabase() {
    companion object {
        private const val DB_NAME = "gate.db"

        @Volatile
        private var INSTANCE: GateDatabase? = null

        fun db(context: Context): GateDatabase {
            return INSTANCE ?: synchronized(this) {
                INSTANCE = Room.databaseBuilder(
                    context, GateDatabase::class.java, DB_NAME
                ).build()

                return INSTANCE!!
            }
        }
    }

    abstract fun nodeDao(): NodeDao

    fun getAllNodes(callback: (List<NodeModel>) -> Unit) = thread {
        callback(nodeDao().getAll())
    }
}