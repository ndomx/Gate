#ifndef LIBS_SCHEDULER_SCHEDULER_H
#define LIBS_SCHEDULER_SCHEDULER_H

#include <stdint.h>

#include "task.h"
#include "types.h"

namespace scheduler
{
    bool set_task(uint32_t delay_ms, callback_t callback, void* executor);
    void run_tasks(void);
} // namespace scheduler

#endif //  LIBS_SCHEDULER_SCHEDULER_H
