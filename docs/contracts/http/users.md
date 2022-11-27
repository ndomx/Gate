# Users

## Create User

### Request

- HTTP method: `POST`
- Body:

|   field    |    type    | is optional | description                           |
| :--------: | :--------: | :---------: | :------------------------------------ |
| `admin_id` |  `string`  |     ❌      | Admin ID                              |
| `root_id`  |  `string`  |     ❌      | ID of thehost root                    |
|  `person`  |  `Object`  |     ❌      | User's personal info                  |
|  `access`  | `string[]` |     ❌      | List of accessable paths for the user |

**Person**
| field | type | is optional | description |
| :---: | :---: | :---------: | :--------- |
| `name` | `string` | ❌ | First name |
| `last` | `string` | ❌ | Last name |

### Response

|   field    |    type    | is optional | description                           |
| :--------: | :--------: | :---------: | :------------------------------------ |
|  `userId`  |  `string`  |     ❌      | Created user ID                       |
|  `rootId`  |  `string`  |     ❌      | User's root ID                        |
| `personId` |  `string`  |     ❌      | User's person ID                      |
|  `access`  | `string[]` |     ❌      | List of accessable paths for the user |

### Example

```jsonc
// Request
{
    "admin_id": "638178c1b1348308cc1e37be",
    "root_id": "636674f1e0ac56ce4ff1949c",
    "person": {
        "name": "nicolas",
        "last": "dominguez"
    },
    "access": [
        "building/entrance",
        "building/3rd-floor/apt304"
    ]
}

// Response
{
    "userId": "636674f101ac56ce4ff1949c",
    "rootId": "632174f101ac56ce4ff1949c",
    "personId": "63ca74f101ac56ce4ff1949c",
    "access": [
        "building/entrance",
        "building/3rd-floor/apt304"
    ]
}
```

## Update User

### Request

- HTTP method: `PATCH`
- Body:

|   field    |    type    | is optional | description                           |
| :--------: | :--------: | :---------: | :------------------------------------ |
| `admin_id` |  `string`  |     ❌      | Admin ID                              |
| `user_id`  |  `string`  |     ❌      | User's ID                             |
|  `person`  |  `Object`  |     ✅      | User's personal info                  |
|  `access`  | `string[]` |     ✅      | List of accessable paths for the user |

**Person**
| field | type | is optional | description |
| :---: | :---: | :---------: | :--------- |
| `name` | `string` | ❌ | First name |
| `last` | `string` | ❌ | Last name |

### Response

|   field    |    type    | is optional | description                           |
| :--------: | :--------: | :---------: | :------------------------------------ |
|  `userId`  |  `string`  |     ❌      | Created user ID                       |
|  `rootId`  |  `string`  |     ❌      | User's root ID                        |
| `personId` |  `string`  |     ❌      | User's person ID                      |
|  `access`  | `string[]` |     ❌      | List of accessable paths for the user |

### Example

```jsonc
// Request
{
    "admin_id": "638178c1b1348308cc1e37be",
        "userId": "636674f101ac56ce4ff1949c",
    "person": {
        "name": "nicolas2",
        "last": "dominguez"
    },
    "access": [
        "building/entrance"
    ]
}

// Response
{
    "userId": "636674f101ac56ce4ff1949c",
    "rootId": "632174f101ac56ce4ff1949c",
    "personId": "63ca74f101ac56ce4ff1949c",
    "access": [
        "building/entrance"
    ]
}
```
