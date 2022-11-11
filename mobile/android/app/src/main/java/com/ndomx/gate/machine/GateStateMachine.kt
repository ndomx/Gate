package com.ndomx.gate.machine

import androidx.core.content.ContextCompat
import com.ndomx.gate.R
import com.ndomx.gate.utils.AppTimer

class GateStateMachine(private val listener: GateStateListener) {
    companion object {
        private const val LOCK_CLOSED_INDEX = 0
        private const val LOCK_OPEN_INDEX = 1

        private const val SUCCESS_ANIMATION_DURATION = 3000L
        private const val FAILURE_ANIMATION_DURATION = 3000L
    }

    val isIdle get() = (state == GateState.IDLE)

    private var state = GateState.IDLE

    private val idleBackground = ContextCompat.getColor(listener.getContext(), R.color.black)
    private val waitingBackground = ContextCompat.getColor(listener.getContext(), R.color.purple_700)
    private val failureBackground = ContextCompat.getColor(listener.getContext(), R.color.red_1)
    private val successBackground = ContextCompat.getColor(listener.getContext(), R.color.green_1)

    fun setState(newState: GateState) {
        val stateData = when (newState) {
            GateState.IDLE -> setIdle()
            GateState.WAITING -> setWaiting()
            GateState.SUCCESS -> setSuccess()
            GateState.FAILURE -> setFailure()
        }

        listener.onState(stateData)
    }

    private fun setIdle(): GateStateData {
        state = GateState.IDLE

        return GateStateData(
            background = idleBackground,
            foregroundLevel = LOCK_CLOSED_INDEX,
            state = GateState.IDLE,
        )
    }

    private fun setWaiting(): GateStateData {
        state = GateState.WAITING

        return GateStateData(
            background = waitingBackground,
            foregroundLevel = LOCK_CLOSED_INDEX,
            state = GateState.WAITING
        )
    }

    private fun setSuccess(): GateStateData {
        state = GateState.SUCCESS
        AppTimer.invoke(SUCCESS_ANIMATION_DURATION) { setState(GateState.IDLE) }

        return GateStateData(
            background = successBackground,
            foregroundLevel = LOCK_OPEN_INDEX,
            state = GateState.SUCCESS,
        )
    }

    private fun setFailure(): GateStateData {
        state = GateState.FAILURE
        AppTimer.invoke(FAILURE_ANIMATION_DURATION) { setState(GateState.IDLE) }


        return GateStateData(
            background = failureBackground,
            foregroundLevel = LOCK_CLOSED_INDEX,
            state = GateState.FAILURE
        )
    }
}