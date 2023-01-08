from gpio_manager import GpioManager
from mqtt_client import MqttClient
from state_machine import StateMachine

if __name__ == '__main__':
    mqtt_client = MqttClient()

    gpio_manager = GpioManager()
    state_machine = StateMachine(gpio_manager.set_relay)

    mqtt_client.connect(lambda msg: state_machine.set_flag())
    gpio_manager.attach_listener(state_machine.set_flag)

    while True:
        state_machine.run()