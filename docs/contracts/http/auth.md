# Auth

## Login

Returns the user's access token

### Request

- Route: `(POST) /auth`
- Body:
  | field | type | is optional | description |
  | :--------: | :--------: | :---------: | :---------------------------------- |
  | `username` | `string` | ❌ | username |
  | `password` | `string` | ❌ | password |

### Response

|  field  |   type   | is optional | description  |
| :-----: | :------: | :---------: | :----------- |
| `token` | `string` |     ❌      | access token |

### Example

```jsonc
// Request
{
  "username": "ndomx",
  "password": "this.is.my.password"
}

// Response
{
  "token": "as98...Ys54a"
}
```
