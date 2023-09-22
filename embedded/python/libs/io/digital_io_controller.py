from abc import ABC, abstractmethod

class DigitalIOController(ABC):
    def __init__(self, initial_state: bool) -> None:
        self.state = initial_state

    @abstractmethod
    def on(self):
        pass
    
    @abstractmethod
    def off(self):
        pass

    @abstractmethod
    def toggle(self):
        pass
    