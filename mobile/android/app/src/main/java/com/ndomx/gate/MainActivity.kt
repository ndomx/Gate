package com.ndomx.gate

import android.os.Bundle
import android.widget.Button
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.ndomx.gate.http.GateClient

class MainActivity : AppCompatActivity(R.layout.activity_main) {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val button = findViewById<Button>(R.id.button_open_gate)
        button.setOnClickListener {
            val client = GateClient.getInstance()
            client.requestAccess {
                onServerResponse(it)
            }
        }
    }

    private fun onServerResponse(result: Boolean) = runOnUiThread {
        Toast.makeText(this, "Server says $result", Toast.LENGTH_SHORT).show()
    }
}