include private.mk

BOARD_NAME := esp8266:esp8266:generic

LIBS := ./lib
SKETCH := ./main
BUILD_DIR := ./build

build:
	$(ARDUINO_CLI) compile -b $(BOARD_NAME) --library $(LIBS) -v --build-path $(BUILD_DIR) $(SKETCH)