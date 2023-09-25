#include "node.h"

#include <stdint.h>

template <typename T>
node<T>::node(void)
{
    next = NULL;
}

template <typename T>
node<T>::node(T value)
{
    next = NULL;
    this->value = value;
}

/** Implementations */
template struct node<uint8_t>;