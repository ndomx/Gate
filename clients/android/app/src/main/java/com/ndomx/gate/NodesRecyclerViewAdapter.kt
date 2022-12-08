package com.ndomx.gate

import android.annotation.SuppressLint
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.google.android.material.floatingactionbutton.FloatingActionButton
import com.ndomx.gate.db.models.NodeModel

class NodesRecyclerViewAdapter(
    private val onNodeClick: (NodeModel) -> Unit
) : RecyclerView.Adapter<NodesRecyclerViewAdapter.ViewHolder>() {
    private val nodes = mutableListOf<NodeModel>()

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.node_view, parent, false)
        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val node = nodes[position]

        holder.nameText.text = node.name
        holder.accessButton.setOnClickListener { onNodeClick(node) }
    }

    override fun getItemCount(): Int {
        return nodes.size
    }

    @SuppressLint("NotifyDataSetChanged")
    fun addNodes(toAdd: List<NodeModel>) {
        nodes.clear()
        nodes.addAll(toAdd)

        /**
         * Because the method clears the whole list,
         * we have to call [notifyDataSetChanged]
         */
        notifyDataSetChanged()
    }

    inner class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val nameText: TextView = view.findViewById(R.id.node_name)
        val accessButton: FloatingActionButton = view.findViewById(R.id.node_open_button)
    }
}