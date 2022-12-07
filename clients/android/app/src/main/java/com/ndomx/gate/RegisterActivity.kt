package com.ndomx.gate

import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import androidx.appcompat.app.AppCompatActivity
import com.ndomx.gate.http.GateClient
import com.ndomx.gate.http.models.RegisterRequestBody

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
                host = serverInput.text.toString()
            )
        }
    }

    private fun registerUser(username: String, password: String, host: String) {
        PrefsManager.save(this, PrefsManager.HOST_URL_KEY, host)
        val request = RegisterRequestBody(
            username, password
        )

        val gateClient = GateClient.getInstance()
        gateClient.register(host, "/auth", request) { onRegistrationSuccess(it) }
    }

    private fun onRegistrationSuccess(token: String?) {
        token?.let { PrefsManager.saveAsync(this, PrefsManager.ACCESS_TOKEN_KEY, it) }
    }
}