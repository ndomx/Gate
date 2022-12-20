import time

from embedded.rpi.python.gpio_manager import SetRelayHandler

STATE_IDLE = 0
STATE_RELAY_ON = 1

class StateMachine:
    __on_duration = 0
    __state = STATE_IDLE
    __relay_flag = False
    __stopwatch = 0

    def __init__(self, handler: SetRelayHandler, relay_on_duration: int):
        self.__on_duration = relay_on_duration
        self.__handler = handler

    def set_flag(self):
        self.__relay_flag = True

    def __set_idle(self):
        self.__state = STATE_IDLE
        self.__handler(False)

    def __set_relay_on(self):
        self.__state = STATE_RELAY_ON
        self.__handler(True)
        self.__stopwatch = time.time()

    def __on_idle(self):
        if self.__relay_flag:
            self.__relay_flag = False
            self.__set_relay_on()
        
    def __on_relay_on(self):
        now = time.time()
        if (now - self.__stopwatch) > self.__on_duration:
            self.__set_idle()

    def run(self):
        if self.__state == STATE_IDLE:
            self.__on_idle()
        elif self.__state == STATE_RELAY_ON:
            self.__on_relay_on()
