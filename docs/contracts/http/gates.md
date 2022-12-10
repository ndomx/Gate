# Gates

## Open gate

Activates a device

### Request

- Route: `(GET) /activate/:device_id`
- Required headers:
  - Json Web Token (JWT) with user access
- Params:
  | field | type | is optional | description |
  | :---------: | :------: | :---------: | :------------------------ |
  | `device_id` | `string` | ❌ | Device trying to open |

> The user needs to have access to the requested device in order to activate it

### Response

|    field    |   type   | is optional | description           |
| :---------: | :------: | :---------: | :-------------------- |
| `topic` | `string` |     ❌      | device's mqtt topic |
| `success` | `boolean` |     ❌      | operation result |
| `node` | `Object` |     ❌      | device's info |

**Node**
|   field    |   type   | is optional | description            |
| :--------: | :------: | :---------: | :--------------------- |
|  `nodeId`  | `string` |     ❌      | created node's id      |
|  `rootId`  | `string` |     ❌      | node's root id         |
|  `parent`  | `string` |     ❌      | node's parent id       |
|   `name`   | `string` |     ❌      | node's name            |
| `nodeInfo` | `Object` |     ❌      | additional information |

**Node Info**
| field | type | is optional | description |
| :--------------: | :------: | :---------: | :----------------------------------------- |
| `isDevice` | `boolean` | ❌ | `true` for _device nodes_ and `false` elsewhere |

### Example

```bash
# Request
curl -H 'Authorization: Bearer ey...Fjg' \
localhost:3000/activate/63702e9d3c71cb704ab9aa4b
```

```jsonc
// Response
{
  "node": {
    "name": "main-entrance",
    "parent": "6389519092341db5e789aa22",
    "rootId": "6389519092341db5e789aa22",
    "nodeInfo": {
      "isDevice": true
    },
    "nodeId": "63702e9d3c71cb704ab9aa4b"
  },
  "success": true,
  "topic": "home/main-entrance"
}
```
