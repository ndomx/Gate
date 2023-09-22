import time

from libs.io.digital_io_controller import DigitalIOController

STATE_IDLE = 0
STATE_ACTIVE = 1
STATE_DISABLED = 2
STATE_ERROR = -1

DEFAULT_TIMEOUT_MS = 1000

class StateMachine:
    __state = STATE_IDLE
    __action_flag = False
    __stopwatch = 0

    def __init__(self, output: DigitalIOController, active_timeout_ms: int = DEFAULT_TIMEOUT_MS, disabled_timeout_ms: int = DEFAULT_TIMEOUT_MS):
        self.__active_timeout = active_timeout_ms * 0.001
        self.__disabled_timeout = disabled_timeout_ms * 0.001
        self.__output_controller = output

        self.__set_state_idle()

    def set_flag(self):
        self.__action_flag = True

    def run(self):
        if self.__state == STATE_IDLE:
            self.__on_state_idle()
        elif self.__state == STATE_ACTIVE:
            self.__on_state_active()
        elif self.__state == STATE_DISABLED:
            self.__on_state_disabled()
        elif self.__state == STATE_ERROR:
            self.__on_state_error()
        
        else:
            self.__set_state_error()

    def __set_state_idle(self):
        self.__state = STATE_IDLE
        self.__action_flag = False

    def __set_state_active(self):
        self.__state = STATE_ACTIVE
        self.__output_controller.on()

        self.__stopwatch = time.time()

    def __set_state_disabled(self):
        self.__state = STATE_DISABLED
        self.__output_controller.off()
        
        self.__stopwatch = time.time()

    def __set_state_error(self):
        self.__state = STATE_ERROR
        self.__output_controller.off()
        self.__action_flag = False

    def __on_state_idle(self):
        if self.__action_flag:
            self.__set_state_active()

    def __on_state_active(self):
        dt = time.time() - self.__stopwatch
        if dt > self.__active_timeout:
            self.__set_state_disabled()

    def __on_state_disabled(self):
        dt = time.time() - self.__stopwatch
        if dt > self.__disabled_timeout:
            self.__set_state_idle()

    def __on_state_error(self):
        pass
