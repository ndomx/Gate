from libs.io.digital_io_controller import DigitalIOController

class VirtualIOController(DigitalIOController):
    def __init__(self, initial_state: bool) -> None:
        super().__init__(initial_state)

    def on(self):
        self.state = True
        self.__print_state()

    def off(self):
        self.state = False
        self.__print_state()

    def toggle(self):
        self.state = not self.state
        self.__print_state()

    def __print_state(self):
        print('state=', self.state)