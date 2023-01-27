from genericpath import isdir
import os
import sys
import shutil

from pathlib import Path

def remove_files(path: os.PathLike):
    for location in os.listdir(path):
        directory = path / location

        if os.path.isdir(directory):
            shutil.rmtree(directory)
        else:
            os.remove(directory)

if __name__ == '__main__':
    path = Path(os.getcwd()) / sys.argv[1]
    if not os.path.exists(path):
        sys.exit(0)

    remove_files(path)