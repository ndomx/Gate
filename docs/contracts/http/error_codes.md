# Error Codes

If any HTTP request fails, the server will return an internal error code in addition to the HTTP code.

### Response

If the request is invalid, the server will return an error code, aside from the respective HTTP code

|    field    |   type   | is optional | description            |
| :---------: | :------: | :---------: | :--------------------- |
| `errorCode` | `number` |     ❌      | See table below        |
|  `message`  | `string` |     ✅      | Additional information |

The internal error codes are described in the following table

| value |        name        | description                                    |
| :---: | :----------------: | :--------------------------------------------- |
|   1   |  `USER_NOT_FOUND`  | User not in database                           |
|   2   |  `ACCESS_DENIED`   | User does not have access rights               |
|   3   | `DEVICE_NOT_FOUND` | Device not in database                         |
|   4   |  `DATABASE_ERROR`  | Database error                                 |
|   5   |  `ROOT_NOT_FOUND`  | Root not in database or not a parent of device |
|   6   |    `NOT_DEVICE`    | Node is abstract                               |
|   7   |    `NOT_ADMIN`     | Invalid Admin ID                               |
|   8   |    `PATH_ERROR`    | Provided path is invalid                       |
|   9   |    `GATE_ERROR`    | Internal unhandled exception                   |
|  10   |  `NODE_NOT_FOUND`  | Could not find the requested node              |
|  10   | `INVALID_REQUEST`  | Request contains invalid data                  |
