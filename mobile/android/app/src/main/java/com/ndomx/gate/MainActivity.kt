package com.ndomx.gate

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import com.google.android.material.snackbar.Snackbar

class MainActivity : AppCompatActivity(R.layout.activity_main) {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val button = findViewById<Button>(R.id.button_open_gate)
        button.setOnClickListener { view ->
            Snackbar.make(view, "Click", Snackbar.LENGTH_SHORT).show()
        }
    }
}