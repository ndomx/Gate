package com.ndomx.gate

import android.content.Context
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import androidx.appcompat.app.AppCompatActivity
import com.ndomx.gate.http.GateClient
import com.ndomx.gate.http.models.LoginRequest
import kotlin.concurrent.thread

class RegisterActivity : AppCompatActivity(R.layout.activity_register) {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val button = findViewById<Button>(R.id.button_register)
        val usernameInput = findViewById<EditText>(R.id.username_input)
        val passwordInput = findViewById<EditText>(R.id.password_input)
        val serverInput = findViewById<EditText>(R.id.server_input)

        button.setOnClickListener {
            registerUser(
                username = usernameInput.text.toString(),
                password = passwordInput.text.toString(),
                server = serverInput.text.toString()
            )
        }
    }

    private fun registerUser(username: String, password: String, server: String) {
        // update server in prefs
        saveToPrefs("server_url", server)

        // call http client
        val request = LoginRequest(
            username, password
        )

        val gateClient = GateClient.getInstance()
        gateClient.register(server, request) { onRegistrationSuccess(it) }
    }

    private fun onRegistrationSuccess(token: String?) {
        token?.let { saveToPrefs("user_token", it) }
    }

    private fun saveToPrefs(key: String, value: String) {
        thread {
            val prefs = getSharedPreferences("gate", Context.MODE_PRIVATE)
            with(prefs.edit()) {
                putString(key, value)
                apply()
            }
        }
    }
}