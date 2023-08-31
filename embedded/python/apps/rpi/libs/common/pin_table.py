from enum import IntEnum, unique
import os

@unique
class GpioBcm(IntEnum):
    GPIO_02 = 3
    GPIO_03 = 5
    GPIO_04 = 7
    GPIO_14 = 8
    GPIO_15 = 10
    GPIO_17 = 11
    GPIO_18 = 12
    GPIO_27 = 13
    GPIO_22 = 15
    GPIO_23 = 16
    GPIO_24 = 18
    GPIO_10 = 19
    GPIO_09 = 21
    GPIO_25 = 22
    GPIO_11 = 23
    GPIO_08 = 24
    GPIO_07 = 26
    GPIO_05 = 29
    GPIO_06 = 31
    GPIO_12 = 32
    GPIO_13 = 33
    GPIO_19 = 35
    GPIO_16 = 36
    GPIO_26 = 37
    GPIO_20 = 38
    GPIO_21 = 40

@unique
class GpioPin(IntEnum):
    PIN_03 = 2
    PIN_05 = 3
    PIN_07 = 4
    PIN_08 = 14
    PIN_10 = 15
    PIN_11 = 17
    PIN_12 = 18
    PIN_13 = 27
    PIN_15 = 22
    PIN_16 = 23
    PIN_18 = 24
    PIN_19 = 10
    PIN_21 = 9
    PIN_22 = 25
    PIN_23 = 11
    PIN_24 = 8
    PIN_26 = 7
    PIN_29 = 5
    PIN_31 = 6
    PIN_32 = 12
    PIN_33 = 13
    PIN_35 = 19
    PIN_36 = 16
    PIN_37 = 26
    PIN_38 = 20
    PIN_40 = 21

def pin_to_bcm(pin: int)->int:
    return GpioPin[f'PIN_{pin:02d}'].value

def bcm_to_pin(bcm: int)->int:
    return GpioBcm[f'GPIO_{bcm:02d}'].value

def load_bcm(pin_key: str)->int:
    pin = int(os.environ.get(pin_key))
    return pin_to_bcm(pin)
