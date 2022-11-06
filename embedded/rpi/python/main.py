# test program
from gpiozero import DigitalOutputDevice as digital_output
import time

RELAY_PIN = 4 # pin 7
relay = digital_output(RELAY_PIN)

relay.off()
while True:
    relay.toggle()
    time.sleep(1)