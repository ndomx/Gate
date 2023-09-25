#ifndef LIBS_MISC_QUEUE_H
#define LIBS_MISC_QUEUE_H

#include <stdint.h>
#include <stddef.h>

#include "node.h"

template <typename T>
class queue
{
    public:
    queue(size_t size);
    ~queue();

    inline size_t count(void) const
    {
        return _count;
    }

    inline size_t size(void) const
    {
        return _size;
    }

    bool pop(T* value);
    size_t pop(T* values, size_t size);
    
    bool push(T value);
    size_t push(T* values, size_t size);
    T peek(void);

    private:
    size_t _count;
    size_t _size;
    node<T>* _first;
    node<T>* _last;
};

#endif // LIBS_MISC_QUEUE_H