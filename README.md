# Gate
## About
This repo contains all the necessary code to implement a remote gate controller. The code is split in 3 apps:
- An Android app that allows the user to control the gate from an Android smartphone
- A server app that handles the request coming from the Android app
- An embedded app that controls the hardware required to open/close the gates

## Repository Structure
Each app contains its own `README.md` explaining how to get that specific app running.
- `/server/` contains the server side app
- `/embedded/` contains the embedded app, this directory is split into multiple child directories depending on the hardware and language. Regardless, each of these directories should contain a different implementation for the same program
- `/clients/android/` contains the Android app. Future releases will contain parallel directories to support other platforms, and frameworks
