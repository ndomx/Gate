package com.ndomx.phonecontroller.controllers

import android.content.Context
import android.content.SharedPreferences
import com.ndomx.phonecontroller.R

object PreferenceController {
    fun loadString(context: Context, key: String): String {
        val prefs = sharedPrefs(context)
        val stored = prefs.getString(key, "")

        return stored!!
    }

    fun loadBoolean(context: Context, key: String): Boolean {
        val prefs = sharedPrefs(context)
        return prefs.getBoolean(key, false)
    }

    fun saveKey(context: Context, key: String, value: String) {
        val prefs = sharedPrefs(context)
        prefs.edit().putString(key, value).apply()
    }

    fun saveKey(context: Context, key: String, value: Boolean) {
        val prefs = sharedPrefs(context)
        prefs.edit().putBoolean(key, value).apply()
    }

    private fun sharedPrefs(context: Context): SharedPreferences {
        val preferenceFileKey = context.getString(R.string.preference_file_key)
        return context.getSharedPreferences(preferenceFileKey, Context.MODE_PRIVATE)
    }
}