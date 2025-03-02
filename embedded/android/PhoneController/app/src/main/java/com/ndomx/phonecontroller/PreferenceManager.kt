package com.ndomx.phonecontroller

import android.content.Context
import android.content.SharedPreferences

object PreferenceManager {
    fun loadKey(context: Context, key: String): String {
        val prefs = sharedPrefs(context)

        val stored = prefs.getString(key, "")
        return stored!!
    }

    fun saveKey(context: Context, key: String, value: String) {
        val prefs = sharedPrefs(context)
        prefs.edit().putString(key, value).apply()
    }

    private fun sharedPrefs(context: Context): SharedPreferences {
        val preferenceFileKey = context.getString(R.string.preference_file_key)
        return context.getSharedPreferences(preferenceFileKey, Context.MODE_PRIVATE)
    }
}