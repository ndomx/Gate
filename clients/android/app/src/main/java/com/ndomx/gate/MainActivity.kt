package com.ndomx.gate

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.graphics.drawable.LayerDrawable
import android.graphics.drawable.LevelListDrawable
import android.os.Build
import android.os.Bundle
import android.util.Log
import android.view.Menu
import android.view.MenuItem
import android.widget.ImageView
import android.widget.TextView
import android.widget.Toast
import androidx.activity.result.ActivityResultLauncher
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.Toolbar
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.ndomx.gate.auth.AuthListener
import com.ndomx.gate.auth.AuthManager
import com.ndomx.gate.db.GateDatabase
import com.ndomx.gate.http.GateClient
import com.ndomx.gate.machine.GateState
import com.ndomx.gate.machine.GateStateData
import com.ndomx.gate.machine.GateStateListener
import com.ndomx.gate.machine.GateStateMachine
import kotlin.concurrent.thread

class MainActivity : AppCompatActivity(R.layout.activity_main), AuthListener, GateStateListener {
    companion object {
        private const val LOG_TAG = "MainActivity"
        private const val BACKGROUND_INDEX = 0
        private const val LOCK_INDEX = 1

        private val STATE_CAPTION = mapOf(
            GateState.IDLE to "Press the button to open",
            GateState.WAITING to "Opening gate...",
            GateState.SUCCESS to "Gate opened!",
            GateState.FAILURE to "Failed to open gate",
        )
    }

    private lateinit var resultLauncher: ActivityResultLauncher<Intent>
    private val authManager = AuthManager(this)
    private val gateStateMachine by lazy { GateStateMachine(this) }

    private lateinit var icon: LayerDrawable
    private val iconBackground by lazy { icon.getDrawable(BACKGROUND_INDEX) }
    private val lockIcon by lazy { icon.getDrawable(LOCK_INDEX) as LevelListDrawable }

    private lateinit var caption: TextView

    private val nodesAdapter = NodesRecyclerViewAdapter { node ->
        if (gateStateMachine.isIdle) {
            gateStateMachine.nodeId = node.id
            requestAccess()
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val button = findViewById<ImageView>(R.id.button_open_gate)
        button.setOnClickListener {
            if (gateStateMachine.isIdle) {
                requestAccess()
            }
        }

        val toolbar = findViewById<Toolbar>(R.id.main_toolbar)
        setSupportActionBar(toolbar)

        val recyclerView = findViewById<RecyclerView>(R.id.node_list)
        loadRecyclerView(recyclerView)

        icon = button.drawable as LayerDrawable
        caption = findViewById(R.id.button_state)

        resultLauncher =
            registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { result ->
                if (result.resultCode == Activity.RESULT_OK) {
                    onAuthSuccess()
                } else {
                    onAuthFailure()
                }
            }
    }

    override fun onStart() {
        super.onStart()

        gateStateMachine.setState(GateState.IDLE)
    }

    override fun onCreateOptionsMenu(menu: Menu?): Boolean {
        menuInflater.inflate(R.menu.main_menu, menu)

        return super.onCreateOptionsMenu(menu)
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean = when (item.itemId) {
        R.id.action_login -> {
            val i = Intent(this, RegisterActivity::class.java)
            startActivity(i)
            true
        }
        R.id.action_sync -> {
            syncNodes()
            true
        }
        else -> super.onOptionsItemSelected(item)
    }

    override fun onAuthSuccess() {
        val client = GateClient.getInstance()
        thread {
            val host = PrefsManager.loadString(this, PrefsManager.HOST_URL_KEY)
                ?: throw Exception("URL not configured yet")

            val token = PrefsManager.loadString(this, PrefsManager.ACCESS_TOKEN_KEY)
                ?: throw Exception("User not registered yet")

            val nodeId = gateStateMachine.nodeId ?: throw Exception("Node id cannot be null")

            client.requestAccess(host, token, nodeId) {
                onServerResponse(it)
            }
        }
    }

    override fun onAuthFailure() = runOnUiThread {
        Toast.makeText(this, "Auth failed", Toast.LENGTH_SHORT).show()
        runOnUiThread {
            gateStateMachine.setState(GateState.FAILURE)
        }
    }

    override fun getContext(): Context {
        return this
    }

    override fun onState(gateStateData: GateStateData) = runOnUiThread {
        iconBackground.setTint(gateStateData.background)
        lockIcon.level = gateStateData.foregroundLevel
        caption.text = STATE_CAPTION[gateStateData.state]
    }

    private fun requestAccess() {
        runOnUiThread {
            gateStateMachine.setState(GateState.WAITING)
        }

        if (Build.VERSION.SDK_INT > 29) {
            Log.i(LOG_TAG, "Using BiometricPrompt API")
            authManager.showBiometricPrompt(this)
        } else {
            Log.i(LOG_TAG, "Using KeyGuardPrompt API")
            authManager.showKeyguardPrompt(this, resultLauncher)
        }
    }

    // TODO: Create model for server response
    private fun onServerResponse(success: Boolean) = runOnUiThread {
        if (success) {
            Toast.makeText(this, "Successfully opened gate", Toast.LENGTH_SHORT).show()
            gateStateMachine.setState(GateState.SUCCESS)
        } else {
            // val message = res.message ?: "Failed with code ${res.errorCode}"
            val message = "Could not open gate"
            Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
            gateStateMachine.setState(GateState.FAILURE)
        }
    }

    private fun loadRecyclerView(view: RecyclerView) = with(view) {
        layoutManager = LinearLayoutManager(context)
        adapter = nodesAdapter

        syncNodes()
    }

    private fun syncNodes() {
        val db = GateDatabase.db(this)
        db.getAllNodes { nodes ->
            nodesAdapter.addNodes(nodes)
        }
    }
}