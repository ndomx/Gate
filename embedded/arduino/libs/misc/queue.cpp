#include "queue.h"

template <typename T>
queue<T>::queue(size_t size)
{
    _size = size;
    _count = 0;

    _first = NULL;
    _last = NULL;
}

template <typename T>
queue<T>::~queue()
{
    if (_count == 0) return;

    node<T>* current;
    node<T>* next;

    current = _first;
    while (current->next != NULL)
    {
        next = current->next;
        delete current;

        current = next;
    }
}

template <typename T>
bool queue<T>::pop(T* value)
{
    if (_count == 0) return false;

    *value = _first->value;

    node<T>* new_first = _first->next;
    delete _first;
    _first = new_first;

    _count--;

    return true;
}

template <typename T>
size_t queue<T>::pop(T* values, size_t size)
{
    bool res = true;
    size_t read = 0;
    while (res && (read < size))
    {
        res = pop(values + (read++));
    }

    return read;
}

template <typename T>
bool queue<T>::push(T value)
{
    if (_count >= _size)
    {
        return false;
    }

    if (_count == 0)
    {
        _first = new node<T>(value);
        _last = _first;
        _count = 1;
        return true;
    }

    node<T>* new_last = new node<T>(value);
    _last->next = new_last;
    _last = new_last;

    _count++;

    return true;
}

template <typename T>
size_t queue<T>::push(T* values, size_t size)
{
    size_t i = 0;
    bool res = true;
    while (res && (i < size))
    {
        res = push(values[i++]);
    }

    return i;
}

template <typename T>
T queue<T>::peek(void)
{
    return _first->value;
}

/** Implementations */
template class queue<uint8_t>;

#include "../events/event.h"
template class queue<Event>;