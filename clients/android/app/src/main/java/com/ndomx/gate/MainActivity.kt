package com.ndomx.gate

import android.app.Activity
import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.util.Log
import android.view.Menu
import android.view.MenuItem
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
import com.ndomx.gate.http.models.response.AccessResponse
import com.ndomx.gate.states.NodeState
import com.ndomx.gate.utils.PrefsManager
import kotlin.concurrent.thread

// todo: handle exceptions
class MainActivity : AppCompatActivity(R.layout.activity_main), AuthListener {
    companion object {
        private const val LOG_TAG = "MainActivity"

        private const val SUCCESS_ANIMATION_DURATION = 2000L
        private const val FAILURE_ANIMATION_DURATION = 2000L
    }

    private val deviceMap = mutableMapOf<String, Int>()

    private lateinit var resultLauncher: ActivityResultLauncher<Intent>
    private val authManager = AuthManager(this)

    private lateinit var nodesAdapter: NodesRecyclerViewAdapter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val toolbar = findViewById<Toolbar>(R.id.main_toolbar)
        setSupportActionBar(toolbar)

        val recyclerView = findViewById<RecyclerView>(R.id.node_list)
        loadRecyclerView(recyclerView)

        resultLauncher = registerForActivityResult(
            ActivityResultContracts.StartActivityForResult()
        ) { result ->
            val nodeId = result.data?.getStringExtra("nodeId")
                ?: throw Exception("intent must contain node id")

            if (result.resultCode == Activity.RESULT_OK) {
                onAuthSuccess(nodeId)
            } else {
                onAuthFailure(nodeId)
            }
        }
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

    override fun onAuthSuccess(nodeId: String) {
        val client = GateClient.getInstance()
        thread {
            val host = PrefsManager.loadString(this, PrefsManager.HOST_URL_KEY)
                ?: throw Exception("URL not configured yet")

            val token = PrefsManager.loadString(this, PrefsManager.ACCESS_TOKEN_KEY)
                ?: throw Exception("User not registered yet")

            updateNode(nodeId, NodeState.WAITING)

            client.requestAccess(host, token, nodeId) { res ->
                res?.let { onServerResponse(it) } ?: onAccessDenied(nodeId)
            }
        }
    }

    override fun onAuthFailure(nodeId: String) {
        runOnUiThread {
            Toast.makeText(this, "Auth failed", Toast.LENGTH_SHORT).show()
        }
    }

    private fun requestAccess(nodeId: String) {
        if (Build.VERSION.SDK_INT > 29) {
            Log.i(LOG_TAG, "Using BiometricPrompt API")
            authManager.showBiometricPrompt(this, nodeId)
        } else {
            Log.i(LOG_TAG, "Using KeyGuardPrompt API")
            authManager.showKeyguardPrompt(this, resultLauncher, nodeId)
        }
    }

    private fun onServerResponse(response: AccessResponse) {
        if (response.success) {
            onAccessGranted(response.node.id)
        } else {
            onAccessDenied(response.node.id)
        }
    }

    private fun onAccessGranted(nodeId: String) {
        updateNode(nodeId, NodeState.SUCCESS)

        val runnable = Runnable { updateNode(nodeId, NodeState.IDLE) }
        val handler = Handler(Looper.getMainLooper())
        handler.postDelayed(runnable, SUCCESS_ANIMATION_DURATION)

        runOnUiThread {
            Toast.makeText(this, "Successfully opened gate", Toast.LENGTH_SHORT).show()
        }
    }

    private fun onAccessDenied(nodeId: String) {
        updateNode(nodeId, NodeState.FAILURE)

        val runnable = Runnable { updateNode(nodeId, NodeState.IDLE) }
        val handler = Handler(Looper.getMainLooper())
        handler.postDelayed(runnable, FAILURE_ANIMATION_DURATION)

        runOnUiThread {
            Toast.makeText(this, "Could not open gate", Toast.LENGTH_SHORT).show()
        }
    }

    private fun loadRecyclerView(view: RecyclerView) = with(view) {
        nodesAdapter = NodesRecyclerViewAdapter(context) { node, position ->
            deviceMap[node.id] = position
            requestAccess(node.id)
        }

        layoutManager = LinearLayoutManager(context)
        adapter = nodesAdapter

        syncNodes()
    }

    private fun syncNodes() {
        val db = GateDatabase.db(this)
        db.getAllNodes { nodes ->
            runOnUiThread {
                nodesAdapter.addNodes(nodes)
            }
        }
    }

    private fun getNodePositionOrThrow(nodeId: String): Int {
        return deviceMap[nodeId] ?: throw Exception("device not mapped")
    }

    private fun updateNode(nodeId: String, state: NodeState) = runOnUiThread {
        val position = getNodePositionOrThrow(nodeId)
        nodesAdapter.updateIconByState(position, state)
    }
}