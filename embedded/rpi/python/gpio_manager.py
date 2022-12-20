from typing import List
from collections.abc import Callable
from gpiozero import DigitalOutputDevice as digital_output
from gpiozero import Button as button

RELAY_PIN = 4 # pin 7
BYPASS_PIN = 17 # pin 11

ButtonPressCallback = Callable[[], None]
SetRelayHandler = Callable[[bool], None]

class GpioManager:
    __relay_out = digital_output(RELAY_PIN)
    __bypass_button = button(BYPASS_PIN, pull_up=True)

    __listeners: List[ButtonPressCallback] = []

    def __init__(self):
        self.__bypass_button.when_activated = lambda: self.__on_button_press()

    def attach_listener(self, callback: ButtonPressCallback):
        self.__listeners.append(callback)

    def set_relay(self, state: bool):
        if state:
            self.__relay_out.on()
        else:
            self.__relay_out.off()

    def __on_button_press(self):
        for callback in self.__listeners:
            callback()