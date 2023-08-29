import os
from pathlib import Path
import shutil
import sys

def raise_bad_usage_exception(message: str):
    print('👉 usage: python tools/scripts/scaffold_app.py <app_name>')
    raise Exception(message)

def raise_existing_app_error(app_name):
    print(f'❌ app {app_name} already exists')
    raise Exception('app already exists')

def validate_directory():
    if 'apps' not in os.listdir(os.getcwd()):
        raise_bad_usage_exception('invalid base directory')
    
def scaffold_app(app_name):
    app_path = Path() / 'apps' / app_name
    templates_path = Path() / 'tools' / 'scripts' / 'templates'

    if (os.path.exists(app_path)):
        raise_existing_app_error(app_name)

    os.makedirs(app_path)
    shutil.copyfile(templates_path / 'app_name.template.ino', app_path / f'{app_name}.ino')
    shutil.copyfile(templates_path / 'build-params.template.mk', app_path / 'build-params.mk')

if __name__ == '__main__':
    validate_directory()

    if len(sys.argv) != 2:
        raise_bad_usage_exception('invalid calling arguments')

    app_name = sys.argv[-1].lower()
    scaffold_app(app_name)