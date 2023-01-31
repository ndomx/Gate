include user.mk

BOARD_NAME := esp8266:esp8266:generic

SCRIPTS := ./tools/scripts
RM := python $(SCRIPTS)/remove_files.py

LIBS := ./lib
SKETCH := ./main
BUILD_DIR := ./build

TARGET := main.ino

SRCS := $(shell python $(SCRIPTS)/find_files.py $(LIBS) cpp)

DBG_FLAG =
ifdef DEBUG
DBG_FLAG = --build-property "build.extra_flags=\"-D__DEBUG\"" --optimize-for-debug
endif

.PHONY: build upload clean rebuild

build: $(BUILD_DIR)/$(TARGET).bin

upload:
	$(ARDUINO_CLI) upload -b $(BOARD_NAME) -p $(PORT) -i $(BUILD_DIR)/$(TARGET).bin

$(BUILD_DIR)/$(TARGET).bin: $(SKETCH)/$(TARGET) $(SRCS)
	$(ARDUINO_CLI) compile -b $(BOARD_NAME) --libraries $(LIBS) -v --build-path $(BUILD_DIR) $(DBG_FLAG) $(SKETCH)

clean:
	$(RM) $(BUILD_DIR)

rebuild: clean build
