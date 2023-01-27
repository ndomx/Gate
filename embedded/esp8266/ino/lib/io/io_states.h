#ifndef LIB_IO_IOSTATES_H
#define LIB_IO_IOSTATES_H

enum IO_States
{
    IO_STATE_IDLE = 0,
    IO_STATE_ACTIVE = 1,
    IO_STATE_DISABLED = 2,
    IO_STATE_ERROR = -1,
};

#endif // LIB_IO_IOSTATES_H