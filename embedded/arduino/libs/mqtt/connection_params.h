namespace mqtt
{
    typedef void (*callback_t)(void);
    struct ConnectionParams
    {
        const char* url;
        const int port;
        const callback_t callback;
    };
} // namespace mqtt