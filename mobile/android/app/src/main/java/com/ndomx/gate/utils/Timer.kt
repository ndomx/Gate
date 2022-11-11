package com.ndomx.gate.utils

import android.os.CountDownTimer
import android.util.Log
import kotlin.concurrent.thread

object AppTimer {
    private const val LOG_TAG = "Timer"

    private var timer: CountDownTimer? = null

    fun invoke(millis: Long, callback: () -> Unit) {
        if (timer != null) {
            Log.w(LOG_TAG, "Timer in use")
            return
        }

        timer = object : CountDownTimer(millis, Long.MAX_VALUE) {
            override fun onFinish() {
                Log.i(LOG_TAG, "Timer finished counting")
                thread {
                    callback()
                }

                cancel()
                timer = null
            }

            override fun onTick(millisUntilFinished: Long) {

            }
        }

        Log.i(LOG_TAG, "Timer starting")
        timer?.start()
    }
}