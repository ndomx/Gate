#ifndef _MISC_EVENTS_NODE_H
#define _MISC_EVENTS_NODE_H

#include <stddef.h>

template <typename T>
struct node
{
    node* next;
    T value;

    node(void);
    node(T value);
};

#endif // _MISC_EVENTS_NODE_H