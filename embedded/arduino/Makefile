ifndef PROJECT_NAME
$(error PROJECT_NAME is not defined. Usage: make <rule> PROJECT_NAME=<project_name>.)
endif

$(info running make on $(PROJECT_NAME))
include $(PROJECT_NAME)/build-params.mk

SCRIPTS := ./tools/scripts
RM := python $(SCRIPTS)/remove_files.py

LIBS := ./libs
BUILD_DIR := ./$(PROJECT_NAME)/build

TARGET := $(PROJECT_NAME)/$(PROJECT_NAME).ino

SRCS := $(shell python $(SCRIPTS)/find_files.py $(LIBS) cpp)

BUILD_FLAGS = -v
ifeq ($(BUILD_TYPE), DEBUG)
BUILD_FLAGS += --build-property "build.extra_flags=\"-D__DEBUG\"" --optimize-for-debug
endif

.PHONY: build upload clean rebuild assert

build: $(BUILD_DIR)/$(TARGET).bin

upload:
	$(ARDUINO_CLI) upload -b $(BOARD_NAME) -p $(PORT) -i $(BUILD_DIR)/$(TARGET).bin

$(BUILD_DIR)/$(TARGET).bin: $(TARGET) $(SRCS)
	$(ARDUINO_CLI) compile -b $(BOARD_NAME) --libraries $(LIBS) --build-path $(BUILD_DIR) $(BUILD_FLAGS) $(PROJECT_NAME)

clean:
	$(RM) $(BUILD_DIR)

rebuild: clean build
