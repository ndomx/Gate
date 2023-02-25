# Users

## Create User

Creates a user

### Request

- HTTP method: `(POST) /users-client`
- Required headers:
  - Json Web Token (JWT) with admin access
- Body:
  | field | type | is optional | description |
  | :--------: | :--------: | :---------: | :---------------------------------- |
  | `root_id` | `string` | ❌ | user's root id |
  | `name` | `string` | ❌ | first name |
  | `last` | `string` | ❌ | last name |
  | `username` | `string` | ❌ | username |
  | `password` | `string` | ❌ | password |
  | `access` | `string[]` | ❌ | user's accessible paths |
  | `roles` | `string[]` | ✅ | user's roles (defaults to `[user]`) |

### Response

|   field    |    type    | is optional | description             |
| :--------: | :--------: | :---------: | :---------------------- |
|  `userId`  |  `string`  |     ❌      | user's id              |
|  `rootId`  |  `string`  |     ❌      | user's root id          |
|   `name`   |  `string`  |     ❌      | first name              |
|   `last`   |  `string`  |     ❌      | last name               |
| `username` |  `string`  |     ❌      | username                |
|  `access`  | `string[]` |     ❌      | user's accessible paths |
|  `roles`   | `string[]` |     ❌      | user's roles            |

### Example

```jsonc
// Request
{
    "root_id": "636674f1e0ac56ce4ff1949c",
    "name": "nicolas",
    "last": "dominguez",
    "username": "ndomx",
    "password": "this.is.not.my.real.password",
    "access": [
        "building/entrance",
        "building/3rd-floor/apt304"
    ]
},

// Response
{
    "rootId": "636674f1e0ac56ce4ff1949c",
    "userId": "636674f1e0ac56c0a7c2949c",
    "name": "nicolas",
    "last": "dominguez",
    "username": "ndomx",
    "access": [
        "building/entrance",
        "building/3rd-floor/apt304"
    ],
    "roles": [
        "user"
    ]
}
```

## Get User

Returns a user

### Request

- HTTP method: `(GET) /users-client/:userId`
- Required headers:
  - Json Web Token (JWT) with admin access
- Params:
  | field | type | is optional | description |
  | :--------: | :--------: | :---------: | :---------------------------------- |
  | `userId` | `string` | ❌ | user's id |

### Response

|   field    |    type    | is optional | description             |
| :--------: | :--------: | :---------: | :---------------------- |
|  `userId`  |  `string`  |     ❌      | user's is               |
|  `rootId`  |  `string`  |     ❌      | user's root id          |
|   `name`   |  `string`  |     ❌      | first name              |
|   `last`   |  `string`  |     ❌      | last name               |
| `username` |  `string`  |     ❌      | username                |
|  `access`  | `string[]` |     ❌      | user's accessable paths |
|  `roles`   | `string[]` |     ❌      | user's roles            |

### Example

```bash
# Request
curl \
-H 'Authorization: Bearer 7sdC...221a' \
localhost:3000/users-client/636674f1e0ac56c0a7c2949c
```

```jsonc
// Response
{
  "rootId": "636674f1e0ac56ce4ff1949c",
  "userId": "636674f1e0ac56c0a7c2949c",
  "name": "nicolas",
  "last": "dominguez",
  "username": "ndomx",
  "access": ["building/entrance", "building/3rd-floor/apt304"],
  "roles": ["user"]
}
```

## Update User

Updates a user

### Request

- HTTP method: `(PATCH) /users-client/:userId`
- Required headers:
  - Json Web Token (JWT) with admin access
- Params:
  | field | type | is optional | description |
  | :--------: | :--------: | :---------: | :---------------------------------- |
  | `userId` | `string` | ❌ | user's id |
- Body:
  | field | type | is optional | description |
  | :--------: | :--------: | :---------: | :---------------------------------- |
  | `root_id` | `string` | ✅ | user's root id |
  | `name` | `string` | ✅ | first name |
  | `last` | `string` | ✅ | last name |
  | `username` | `string` | ✅ | username |
  | `password` | `string` | ✅ | password |
  | `access` | `string[]` | ✅ | user's accessable paths |
  | `roles` | `string[]` | ✅ | user's roles (defaults to `[user]`) |

### Response

|   field    |    type    | is optional | description             |
| :--------: | :--------: | :---------: | :---------------------- |
|  `userId`  |  `string`  |     ❌      | user's is               |
|  `rootId`  |  `string`  |     ❌      | user's root id          |
|   `name`   |  `string`  |     ❌      | first name              |
|   `last`   |  `string`  |     ❌      | last name               |
| `username` |  `string`  |     ❌      | username                |
|  `access`  | `string[]` |     ❌      | user's accessable paths |
|  `roles`   | `string[]` |     ❌      | user's roles            |

### Example

```bash
# Request
curl \
-H 'Authorization: Bearer 7sdC...221a' \
-H 'Content-Type: application/json' \
-d '{
  "name": "nocilas",
  "last": "dimongoz",
}' \
localhost:3000/users-client/636674f1e0ac56c0a7c2949c
```

```jsonc
// Response
{
  "rootId": "636674f1e0ac56ce4ff1949c",
  "userId": "636674f1e0ac56c0a7c2949c",
  "name": "nocilas",
  "last": "dimongoz",
  "username": "ndomx",
  "access": ["building/entrance", "building/3rd-floor/apt304"],
  "roles": ["user"]
}
```

## Delete User

Deltes a user

### Request

- HTTP method: `(PATCH) /users-client/:userId`
- Required headers:
  - Json Web Token (JWT) with admin access
- Params:
  | field | type | is optional | description |
  | :--------: | :--------: | :---------: | :---------------------------------- |
  | `userId` | `string` | ❌ | user's id |

### Response

|   field    |    type    | is optional | description             |
| :--------: | :--------: | :---------: | :---------------------- |
|  `userId`  |  `string`  |     ❌      | user's is               |
|  `rootId`  |  `string`  |     ❌      | user's root id          |
|   `name`   |  `string`  |     ❌      | first name              |
|   `last`   |  `string`  |     ❌      | last name               |
| `username` |  `string`  |     ❌      | username                |
|  `access`  | `string[]` |     ❌      | user's accessable paths |
|  `roles`   | `string[]` |     ❌      | user's roles            |

### Example

```bash
# Request
curl \
-H 'Authorization: Bearer 7sdC...221a' \
localhost:3000/users-client/636674f1e0ac56c0a7c2949c
```

```jsonc
// Response
{
  "rootId": "636674f1e0ac56ce4ff1949c",
  "userId": "636674f1e0ac56c0a7c2949c",
  "name": "nicolas",
  "last": "dominguez",
  "username": "ndomx",
  "access": ["building/entrance", "building/3rd-floor/apt304"],
  "roles": ["user"]
}
```
