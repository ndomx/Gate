import json
import os

def load_secrets(path: os.PathLike):
    if not os.path.exists(path):
        raise FileNotFoundError('Couldn\'t locate secrets file')

    if not os.path.isfile(path):
        raise FileNotFoundError('Couldn\'t locate secrets file')   

    with open(path) as secrets_file:
        secrets = json.load(secrets_file)
        for key, value in secrets.items():
            os.environ[key] = value

