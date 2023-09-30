from threading import Timer
from libs.common.command import Command
from libs.common.constants import ExecuteCommandResult
from libs.io.digital_io_controller import DigitalIOController


class DigitalIOHandler():
    def __init__(self, controller: DigitalIOController):
        self.controller = controller

    def execute_command(self, command: Command)->ExecuteCommandResult:
        timeout = 0
        if command.action_details is not None and 'timeout' in command.action_details.keys():
            timeout = command.action_details['timeout']

        timer = None
        if timeout > 0:
            timer = Timer(timeout * 0.001, self.controller.toggle)

        action = None
        if command.action == 'on':
            action = self.controller.on
        elif command.action == 'off':
            action = self.controller.off
        elif command.action == 'toggle':
            action = self.controller.toggle
        else:
            return ExecuteCommandResult.INVALID_ACTION

        action()
        if timer is not None:    
            timer.start()

        return ExecuteCommandResult.OK
