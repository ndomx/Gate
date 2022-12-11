package com.ndomx.gate

import android.content.Intent
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.view.Menu
import android.view.MenuItem
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.Toolbar
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.ndomx.gate.auth.AuthListener
import com.ndomx.gate.auth.AuthManager
import com.ndomx.gate.db.GateDatabase
import com.ndomx.gate.db.models.NodeModel
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
    private val authManager = AuthManager(this)

    private lateinit var nodesAdapter: NodesRecyclerViewAdapter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val toolbar = findViewById<Toolbar>(R.id.main_toolbar)
        setSupportActionBar(toolbar)

        val recyclerView = findViewById<RecyclerView>(R.id.node_list)
        loadRecyclerView(recyclerView)
    }

    override fun onStart() {
        super.onStart()

        validateLogin()
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
            fetchNodes()
            true
        }
        else -> super.onOptionsItemSelected(item)
    }

    override fun onAuthSuccess(nodeId: String) {
        thread {
            val host: String
            val token: String

            try {
                host = PrefsManager.loadString(this, PrefsManager.HOST_URL_KEY)
                    ?: throw Exception("URL not configured yet")

                token = PrefsManager.loadString(this, PrefsManager.ACCESS_TOKEN_KEY)
                    ?: throw Exception("User not registered yet")

                updateNode(nodeId, NodeState.WAITING)
            } catch (e: Exception) {
                runOnUiThread {
                    Toast.makeText(this, e.message, Toast.LENGTH_SHORT).show()
                }

                return@thread
            }

            val client = GateClient.getInstance()
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
        authManager.showBiometricPrompt(this, nodeId)
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
    }

    private fun syncNodes() = thread {
        val db = GateDatabase.db(this)
        db.getAllNodes { nodes ->
            runOnUiThread {
                nodesAdapter.addNodes(nodes)
            }
        }
    }

    private fun clearNodes() = thread {
        val db = GateDatabase.db(this)
        db.clearAllTables()
    }

    private fun fetchNodes() = thread {
        val host = PrefsManager.loadString(this, PrefsManager.HOST_URL_KEY) ?: return@thread
        val token = PrefsManager.loadString(this, PrefsManager.ACCESS_TOKEN_KEY) ?: return@thread

        val client = GateClient.getInstance()
        client.fetchUserNodes(host, token) { res ->
            res?.nodes?.let {
                val nodes = it.map { node ->
                    NodeModel(
                        id = node.id,
                        name = node.name
                    )
                }

                val db = GateDatabase.db(this)
                db.saveNodes(nodes)

                runOnUiThread {
                    Toast.makeText(this, "Found ${nodes.size} devices", Toast.LENGTH_SHORT).show()
                    nodesAdapter.addNodes(nodes)
                }
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

    private fun validateLogin() {
        PrefsManager.loadStringAsync(this, PrefsManager.ACCESS_TOKEN_KEY) { token ->
            token?.let { syncNodes() } ?: clearNodes()
        }
    }
}
