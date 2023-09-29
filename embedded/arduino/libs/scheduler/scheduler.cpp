#include "scheduler.h"

#include <Arduino.h>

namespace scheduler
{
    static Task current_task;
    static bool running = false;
    static uint32_t elapsed = 0;

    static void on_task_event(void);

    bool set_task(uint32_t delay_ms, callback_t callback, void* executor)
    {
        elapsed = millis();
        current_task = {
            .delay_ms = delay_ms,
            .callback = callback,
            .executor = executor,
        };

        running = true;
        return true;
    }

    void run_tasks(void)
    {
        if (!running)
        {
            return;
        }

        uint32_t now = millis();
        if (now < elapsed + current_task.delay_ms)
        {
            return;
        }

        on_task_event();
    }

    static void on_task_event(void)
    {
        current_task.execute();
        running = false;
    }
} // namespace async
