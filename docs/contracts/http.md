# HTTP Schemas

## Open gate

### Request

|    field    |   type   | is optional | description               |
| :---------: | :------: | :---------: | :------------------------ |
| `device_id` | `string` |     ❌      | Device trying to open     |
|  `user_id`  | `string` |     ❌      | User ID, must have acess  |
| `timestamp` | `number` |     ❌      | Unix timestamp of request |

**Example**

```json
{
  "device_id": "63702e9d3c71cb704ab9aa4b",
  "user_id": "637025023e71cb704af9aa49",
  "timestamp": 1668356350
}
```

### Response

|    field    |   type   | is optional | description                |
| :---------: | :------: | :---------: | :------------------------- |
|  `success`  |  `bool`  |     ❌      | True is access was granted |
| `errorCode` | `number` |     ✅      | See error codes below      |
|  `message`  | `string` |     ✅      | Additional information     |
|   `topic`   | `string` |     ✅      | Topic of device requested  |

**Example**

```json
[
  {
    "success": false,
    "errorCode": 2,
    "message": "user doesn't have access to device"
  },
  {
    "success": true,
    "topic": "home/entrance"
  }
]
```

### Error Codes

| value |        name        | description                                    |
| :---: | :----------------: | :--------------------------------------------- |
|   1   |  `USER_NOT_FOUND`  | User not in database                           |
|   2   |  `ACCESS_DENIED`   | User does not have access rights               |
|   3   | `DEVICE_NOT_FOUND` | Device not in database                         |
|   4   |  `DATABASE_ERROR`  | Database error                                 |
|   5   |  `ROOT_NOT_FOUND`  | Root not in database or not a parent of device |
|   6   |    `NOT_DEVICE`    | Node is abstract                               |
