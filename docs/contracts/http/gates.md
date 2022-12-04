# Gates

## Open gate

### Request

- Route: `(GET) /activate/:device_id`
- Required headers:
  - Json Web Token (JWT)
- Params:
  | field | type | is optional | description |
  | :---------: | :------: | :---------: | :------------------------ |
  | `device_id` | `string` | ❌ | Device trying to open |

> The user needs to have access to the requested device in order to activate it

**Example**

```bash
curl -H 'Authorization: Bearer ey...Fjg' \
localhost:3000/activate/63702e9d3c71cb704ab9aa4b
```

### Response

If there are no errors in the request, the server will return the topic to which the device is listening. Otherwise, refer to [error codes](./error_codes.md).

### Example

```json
{
  "topic": "home/entrance"
}
```
