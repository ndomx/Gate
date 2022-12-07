package com.ndomx.gate

import android.content.Context
import android.content.SharedPreferences
import androidx.core.content.edit
import kotlin.concurrent.thread

object PrefsManager {
    private const val PREFS_NAME = "gate"

    const val ACCESS_TOKEN_KEY = "access_token"
    const val HOST_URL_KEY = "host_url"

    fun save(context: Context, key: String, value: String) {
        getPrefs(context).edit {
            putString(key, value)
            commit()
        }
    }

    fun saveAsync(context: Context, key: String, value: String) = thread {
        getPrefs(context).edit {
            putString(key, value)
            apply()
        }
    }

    fun loadString(context: Context, key: String): String? {
        return getPrefs(context).getString(key, null)
    }

    fun loadStringAsync(context: Context, key: String, callback: (String?) -> Unit) = thread {
        val value = loadString(context, key)
        callback(value)
    }

    private fun getPrefs(context: Context): SharedPreferences {
        return context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
    }

}