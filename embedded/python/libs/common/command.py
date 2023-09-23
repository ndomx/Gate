from typing import Any, Dict

class Command:
    def __init__(self, action: str, action_details: Dict[str, Any]):
        self.action = action
        self.action_details = action_details

    @staticmethod
    def from_json(json: Dict[str, Any]):
        if not 'action' in json.keys():
            raise ValueError('[invalid command] command must have an action')

        action = json['action']
        details = json.get('actionDetails', None)

        return Command(action, details)