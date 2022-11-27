# Gates

## Open gate

### Request

- HTTP method: `PUT`
- Body:
  | field | type | is optional | description |
  | :---------: | :------: | :---------: | :------------------------ |
  | `device_id` | `string` | ❌ | Device trying to open |
  | `user_id` | `string` | ❌ | User ID, must have acess |
  | `timestamp` | `number` | ❌ | Unix timestamp of request |

**Example**

```json
{
  "device_id": "63702e9d3c71cb704ab9aa4b",
  "user_id": "637025023e71cb704af9aa49",
  "timestamp": 1668356350
}
```

### Response

If there are no errors in the request, the server will return the topic to which the device is listening.

### Example

```jsonc
// Request
{
  "device_id": "63702e9d3c71cb704ab9aa4b",
  "user_id": "637025023e71cb704af9aa49",
  "timestamp": 1668356350
}

// Response
{
  "topic": "home/entrance"
}
```
