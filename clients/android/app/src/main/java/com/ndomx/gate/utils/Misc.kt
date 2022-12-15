package com.ndomx.gate.utils

fun String.parseNodeName(): String {
    return this
        .replace('-', ' ')
        .replace('_', ' ')
        .split(' ')
        .joinToString(" ") {
            it.replaceFirstChar(Char::titlecase)
        }
}