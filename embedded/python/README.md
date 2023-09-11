# Python

This folder contains every app implemented in python, regardless the underlying architecture.

### Directory structure

```
/embedded/python
|- /apps
|   |- [arch]/[app-name]
|- /libs
```

App implementations are located in the `[arch]/[app-name]` folder. Where `[arch]` represents the embedded architecture and `[app-name]` the app itself. Additionally, there is the `virtual_device` architecture, that represents a virtual device running in the host computer.

The `libs` directory contains many libraries shared by different apps. These files can be consumed across all apps and **should not** contain architecture specific code.

### Usage

This directory (`/embedded/python`) should be used as the root directory when running applications.

```shell
cd embedded/python

# [optional] create a virtual environment
virtualenv venv
source venv/bin/activate

# install the dependencies
pip install -r apps/[arch]/[app-name]/requirements.txt

# run the code
python apps/[arch]/[app-name]/main.py
```
