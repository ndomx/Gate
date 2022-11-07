# test program
from mqtt_client import MqttClient
from gpiozero import DigitalOutputDevice as digital_output
import time

RELAY_PIN = 4 # pin 7

STATE_IDLE = 0
STATE_NOT_READY = 1
STATE_RELAY_ON = 2

RELAY_ON_DURATION = 1

relay = digital_output(RELAY_PIN)

state = STATE_NOT_READY
timestart = 0
flag = False

def set_state_idle():
    global state
    state = STATE_IDLE
    relay.off()

def set_state_relayon():
    global state
    global timestart
    state = STATE_RELAY_ON
    relay.on()
    timestart = time.time()

def on_state_idle():
    global flag
    if (flag):
        set_state_relayon()
        flag = False

def on_state_relayon():
    global timestart
    now = time.time()
    if (now - timestart) > RELAY_ON_DURATION:
        set_state_idle()

def run_statemachine():
    global state
    if (state == STATE_NOT_READY):
        return

    if (state == STATE_IDLE):
        on_state_idle()
    elif (state == STATE_RELAY_ON):
        on_state_relayon()    

def callback(message):
    global flag
    flag = True

if __name__ == '__main__':
    mqttClient = MqttClient()
    mqttClient.connect('home/main', callback)

    set_state_idle()
    while True:
        run_statemachine()