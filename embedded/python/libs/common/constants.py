from enum import IntEnum


class ExecuteCommandResult(IntEnum):
    OK = 0
    INVALID_PAYLOAD = 2
    INVALID_COMMAND = 3
    INVALID_ACTION = 4
    UNKNOWN_ERROR = 5