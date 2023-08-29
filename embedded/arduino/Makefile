ifndef APP_NAME
$(error APP_NAME is not defined. Usage: make <rule> APP_NAME=<app_name>.)
endif

APP_DIR := apps/$(APP_NAME)

$(info running make on $(APP_NAME))
include $(APP_DIR)/build-params.mk

SCRIPTS := ./tools/scripts
RM := python $(SCRIPTS)/remove_files.py

LIBS := ./libs
BUILD_DIR := $(APP_DIR)/build

TARGET := $(APP_NAME).ino

SRCS := $(shell python $(SCRIPTS)/find_files.py $(LIBS) cpp)

BUILD_FLAGS = -v
ifeq ($(BUILD_TYPE), DEBUG)
BUILD_FLAGS += --build-property "build.extra_flags=\"-D__DEBUG\"" --optimize-for-debug
endif

.PHONY: build upload clean rebuild assert

build: $(BUILD_DIR)/$(TARGET).bin

upload:
	$(ARDUINO_CLI) upload -b $(BOARD_NAME) -p $(PORT) -i $(BUILD_DIR)/$(TARGET).bin

$(BUILD_DIR)/$(TARGET).bin: $(APP_DIR)/$(TARGET) $(SRCS)
	$(ARDUINO_CLI) compile -b $(BOARD_NAME) --libraries $(LIBS) --build-path $(BUILD_DIR) $(BUILD_FLAGS) $(APP_DIR)

clean:
	$(RM) $(BUILD_DIR)

rebuild: clean build
