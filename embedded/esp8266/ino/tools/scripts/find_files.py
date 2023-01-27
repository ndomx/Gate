import os
import sys

from pathlib import Path

BASE_PATH = Path(os.getcwd())
TARGET_PATH = Path()

def find_files(path: os.PathLike, extension: str, relative_to: str = BASE_PATH):
    for location in os.listdir(path):
        directory = path / location
        if os.path.isdir(directory):
            find_files(directory, extension, relative_to)
            continue

        (_, ext) = os.path.splitext(location)
        if ext != extension:
            continue

        relative = os.path.relpath(directory, relative_to)
        print(relative)

if __name__ == '__main__':
    TARGET_PATH = BASE_PATH / sys.argv[1]
    if not os.path.exists(TARGET_PATH):
        sys.exit(0)
    
    ext = '.' + sys.argv[2]

    if len(sys.argv) > 3:
        relative_to = BASE_PATH / sys.argv[3]
    else:
        relative_to = BASE_PATH

    if not os.path.exists(relative_to):
        sys.exit(0)

    find_files(TARGET_PATH, ext, relative_to)
