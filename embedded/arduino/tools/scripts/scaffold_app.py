import os
from pathlib import Path
import shutil
import sys

def raise_bad_usage_exception(message: str):
    print('👉 usage: python tools/scripts/scaffold_app.py <app_name>')
    raise Exception(message)

def validate_directory():
    if 'apps' not in os.listdir(os.getcwd()):
        raise_bad_usage_exception('invalid base directory')
    
def scaffold_app(app_name):
    app_path = Path() / 'apps' / app_name
    templates_path = Path() / 'tools' / 'scripts' / 'templates'

    os.makedirs(app_path)
    shutil.copyfile(templates_path / 'app_name.template.ino', app_path / f'{app_name}.ino')
    shutil.copyfile(templates_path / 'build-params.template.mk', app_path / 'build-params.mk')

if __name__ == '__main__':
    if len(sys.argv) != 2:
        raise_bad_usage_exception('invalid calling arguments')

    scaffold_app(sys.argv[-1])