package com.ndomx.phonecontroller.contracts

enum class ExecuteCommandResult(val value: Int) {
    OK(0),
    INVALID_PAYLOAD(2),
    INVALID_COMMAND(3),
    INVALID_ACTION(4),
    UNKNOWN_ERROR(5)
}