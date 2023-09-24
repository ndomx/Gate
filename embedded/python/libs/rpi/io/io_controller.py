from libs.io.digital_io_controller import DigitalIOController

from gpiozero import DigitalOutputDevice as digital_output


class IOController(DigitalIOController):
    def __init__(self, output_pin: int, initial_state: bool):
        super().__init__(initial_state)

        self.output = digital_output(output_pin, initial_value=initial_state)

    def on(self):
        self.output.on()
        self.__update_state()
    
    def off(self):
        self.output.off()
        self.__update_state()
    
    def toggle(self):
        self.output.toggle()
        self.__update_state()
    
    def __update_state(self):
        self.state = self.output.is_active
    