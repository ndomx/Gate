package com.ndomx.gate.utils

import android.content.Context
import android.content.SharedPreferences
import androidx.core.content.edit
import androidx.security.crypto.EncryptedSharedPreferences
import androidx.security.crypto.MasterKey
import kotlin.concurrent.thread

object PrefsManager {
    private const val PREFS_NAME = "gate_secure"

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
        val masterKey = MasterKey.Builder(context)
            .setKeyScheme(MasterKey.KeyScheme.AES256_GCM)
            .build()

        return EncryptedSharedPreferences.create(
            context,
            PREFS_NAME,
            masterKey,
            EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
            EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
        )
    }

}