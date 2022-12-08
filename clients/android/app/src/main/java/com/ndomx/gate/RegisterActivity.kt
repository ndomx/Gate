package com.ndomx.gate

import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.Toolbar
import com.ndomx.gate.db.GateDatabase
import com.ndomx.gate.db.models.NodeModel
import com.ndomx.gate.http.GateClient
import com.ndomx.gate.http.models.request.RegisterRequestBody
import com.ndomx.gate.http.models.response.UserNodesResponse
import kotlin.concurrent.thread

class RegisterActivity : AppCompatActivity(R.layout.activity_register) {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val toolbar = findViewById<Toolbar>(R.id.register_toolbar)
        toolbar.title = "Register"
        setSupportActionBar(toolbar)
        supportActionBar?.setDisplayHomeAsUpEnabled(true)

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
        gateClient.register(host, request) { onRegistrationSuccess(it) }
    }

    private fun onRegistrationSuccess(token: String?) {
        token?.let {
            PrefsManager.saveAsync(this, PrefsManager.ACCESS_TOKEN_KEY, it)
            fetchUserNodes(it)
        }
    }

    private fun fetchUserNodes(token: String) = thread {
        val host = PrefsManager.loadString(this, PrefsManager.HOST_URL_KEY) ?: return@thread

        val client = GateClient.getInstance()
        client.fetchUserNodes(host, token) { res ->
            onReceiveUserNodes(res)
        }
    }

    private fun onReceiveUserNodes(userNodes: UserNodesResponse?) {
        userNodes?.nodes?.let { nodes ->
            val db = GateDatabase.db(this)
            db.saveNodes(nodes.map { node ->
                NodeModel(
                    id = node.id,
                    name = node.name
                )
            })
        }
    }
}