include private.mk

BOARD_NAME := esp8266:esp8266:generic

LIBS := ./lib
SKETCH := ./main

compile:
	$(ARDUINO_CLI) compile -b $(BOARD_NAME) --library $(LIBS) -v $(SKETCH)