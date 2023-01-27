include private.mk

BOARD_NAME := esp8266:esp8266:generic

SCRIPTS := ./tools/scripts
RM := python $(SCRIPTS)/remove_files.py

LIBS := ./lib
SKETCH := ./main
BUILD_DIR := ./build

TARGET := main.ino

SRCS := $(shell python $(SCRIPTS)/find_files.py $(LIBS) cpp)

.PHONY: build upload clean

build: $(BUILD_DIR)/$(TARGET).bin

upload:
	$(ARDUINO_CLI) upload -b $(BOARD_NAME) -p $(PORT) -i $(BUILD_DIR)/$(TARGET).bin

$(BUILD_DIR)/$(TARGET).bin: $(SKETCH)/$(TARGET) $(SRCS)
	$(ARDUINO_CLI) compile -b $(BOARD_NAME) --libraries $(LIBS) -v --build-path $(BUILD_DIR) $(SKETCH)

clean:
	$(RM) $(BUILD_DIR)
