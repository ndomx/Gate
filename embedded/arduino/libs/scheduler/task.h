#ifndef LIBS_SCHEDULER_TASK_H
#define LIBS_SCHEDULER_TASK_H

#include <stdint.h>

#include "types.h"

namespace scheduler
{
    struct Task
    {
        uint32_t delay_ms;
        callback_t callback;
        void* executor;

        inline void execute(void)
        {
            callback(executor);
        }
    };
} // namespace async

#endif // LIBS_SCHEDULER_TASK_H
