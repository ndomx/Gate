# test program
from MqttClient import MqttClient
from gpiozero import DigitalOutputDevice as digital_output
import time

RELAY_PIN = 4 # pin 7
relay = digital_output(RELAY_PIN)

flag = False
def callback(message):
    global flag
    flag = True

if __name__ == '__main__':
    mqttClient = MqttClient()
    mqttClient.connect('home/main', callback)

    relay.off()
    while True:
        if flag:
            relay.toggle()
            flag = False