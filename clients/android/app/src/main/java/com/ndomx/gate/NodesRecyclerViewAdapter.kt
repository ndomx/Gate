package com.ndomx.gate

import android.annotation.SuppressLint
import android.content.Context
import android.graphics.drawable.LayerDrawable
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.RecyclerView
import com.ndomx.gate.db.models.NodeModel
import com.ndomx.gate.states.NodeState
import com.ndomx.gate.ui.UiNode

class NodesRecyclerViewAdapter(
    context: Context,
    private val onNodeClick: (UiNode, Int) -> Unit
) : RecyclerView.Adapter<NodesRecyclerViewAdapter.ViewHolder>() {
    inner class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val nameText: TextView = view.findViewById(R.id.node_name)
        val accessIcon: ImageView = view.findViewById(R.id.node_open_button)
    }

    companion object {
        private const val BACKGROUND_INDEX = 0
        private const val LOCK_INDEX = 1

        private const val LOCK_CLOSED_LEVEL = 0
        private const val LOCK_OPEN_LEVEL = 1
    }

    private val nodes = mutableListOf<UiNode>()

    private val iconIdleTint = ContextCompat.getColor(context, R.color.black)
    private val iconWaitingTint = ContextCompat.getColor(context, R.color.purple_700)
    private val iconFailureTint = ContextCompat.getColor(context, R.color.red_1)
    private val iconSuccessTint = ContextCompat.getColor(context, R.color.green_1)

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.node_view, parent, false)
        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val node = nodes[position]

        holder.nameText.text = node.name
        holder.accessIcon.setOnClickListener { onNodeClick(node, position) }

        setIconToState(holder.accessIcon.drawable as LayerDrawable, node.state)
    }

    override fun getItemCount(): Int {
        return nodes.size
    }

    @SuppressLint("NotifyDataSetChanged")
    fun addNodes(toAdd: List<NodeModel>) {
        nodes.clear()
        nodes.addAll(toAdd.map { UiNode(it.id, it.name, NodeState.IDLE) })

        /**
         * Because the method clears the whole list,
         * we have to call [notifyDataSetChanged]
         */
        notifyDataSetChanged()
    }

    fun updateIconByState(position: Int, state: NodeState) {
        nodes[position].state = state
        notifyItemChanged(position)
    }

    private fun setIconToState(icon: LayerDrawable, state: NodeState) = when (state) {
        NodeState.IDLE -> setIconToIdle(icon)
        NodeState.WAITING -> setIconToWaiting(icon)
        NodeState.FAILURE -> setIconToFailure(icon)
        NodeState.SUCCESS -> setIconToSuccess(icon)
    }

    private fun setIconToIdle(icon: LayerDrawable) {
        val background = icon.getDrawable(BACKGROUND_INDEX)
        background.setTint(iconIdleTint)

        val lockIcon = icon.getDrawable(LOCK_INDEX)
        lockIcon.level = LOCK_CLOSED_LEVEL
    }

    private fun setIconToWaiting(icon: LayerDrawable) {
        val background = icon.getDrawable(BACKGROUND_INDEX)
        background.setTint(iconWaitingTint)

        val lockIcon = icon.getDrawable(LOCK_INDEX)
        lockIcon.level = LOCK_CLOSED_LEVEL
    }

    private fun setIconToFailure(icon: LayerDrawable) {
        val background = icon.getDrawable(BACKGROUND_INDEX)
        background.setTint(iconFailureTint)

        val lockIcon = icon.getDrawable(LOCK_INDEX)
        lockIcon.level = LOCK_CLOSED_LEVEL
    }

    private fun setIconToSuccess(icon: LayerDrawable) {
        val background = icon.getDrawable(BACKGROUND_INDEX)
        background.setTint(iconSuccessTint)

        val lockIcon = icon.getDrawable(LOCK_INDEX)
        lockIcon.level = LOCK_OPEN_LEVEL
    }
}