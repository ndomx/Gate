# Nodes

## Create Node

Creates a new node

### Request

- Route: `(POST) /nodes-client`
- Required headers:
  - Json Web Token (JWT) with admin access
- Body:
  | field | type | is optional | description |
  | :---------: | :------: | :---------: | :-------------------------------- |
  | `root_id` | `string` | ❌ | node's root id |
  | `path` | `string` | ❌ | hierarchical loaction of the node |
  | `name` | `string` | ❌ | node's name |
  | `display_name` | `string` | ✅ | display name for this node |
  | `node_info` | `Object` | ❌ | additional info |

  **Node Info**
  | field | type | is optional | description |
  | :--------------: | :------: | :---------: | :----------------------------------------- |
  | `is_device` | `boolean` | ❌ | `true` for _device nodes_ and `false` elsewhere |

### Response

|     field     |   type   | is optional | description            |
| :-----------: | :------: | :---------: | :--------------------- |
|   `nodeId`    | `string` |     ❌      | created node's id      |
|   `rootId`    | `string` |     ❌      | node's root id         |
|   `parent`    | `string` |     ❌      | node's parent id       |
|    `name`     | `string` |     ❌      | node's name            |
| `displayName` | `string` |     ❌      | node's display name    |
|  `nodeInfo`   | `Object` |     ❌      | additional information |

**Node Info**
| field | type | is optional | description |
| :--------------: | :------: | :---------: | :----------------------------------------- |
| `isDevice` | `boolean` | ❌ | `true` for _device nodes_ and `false` elsewhere |

### Example

```jsonc
// Request
{
    "root_id": "636674f1e0ac56ce4ff1949c",
    "path": "home/test",
    "name": "door",
    "node_info": {
        "is_device": true
    }
}

// Response
{
    "nodeId": "636674f101ac56ce4ff1949c",
    "rootId": "632174f101ac56ce4ff1949c",
    "parent": "63ca74f101ac56ce4ff1949c",
    "path": "home/test/door",
    "nodeInfo": {
        "isDevice": true
    },
    "displayName": "door", // displayName defaults to name if not provided
}
```

## Get Children of Node

Finds all nodes that are descendant of the requested node

### Request

- Route: `(GET) /nodes-client/children/:nodeId`
- Required headers:
  - Json Web Token (JWT) with admin access
- Params:
  | field | type | is optional | description |
  | :-------: | :------: | :---------: | :-------------------------------- |
  | `nodeId` | `string` | ❌ | node's id |

### Response

|  field  |    type    | is optional | description           |
| :-----: | :--------: | :---------: | :-------------------- |
| `nodes` | `Object[]` |     ❌      | List of fetched nodes |

**Node**
| field | type | is optional | description |
| :-----: | :---------: | :---------: | :-------------------- |
| `nodeId` | `string` | ❌ | node's id |
| `rootId` | `string` | ❌ | node's root id |
| `parent` | `string` | ❌ | node's parent id |
| `name` | `string` | ❌ | node's name |
| `nodeInfo` | `Object` | ❌ | node's additional information |

**Node Info**
| field | type | is optional | description |
| :--------------: | :------: | :---------: | :----------------------------------------- |
| `isDevice` | `boolean` | ❌ | `true` for _device nodes_ and `false` elsewhere |

### Example

```bash
# Request
curl -H 'Authorization: Bearer eus87...Y7Hs' \
localhost:3000/nodes-client/638951909c2acdb5e789aa22
```

```jsonc
// Response
{
  "nodes": [
    {
      "name": "home",
      "displayName": "Home",
      "parent": "",
      "rootId": "638951909c2acdb5e789aa22",
      "nodeInfo": {
        "isDevice": false
      },
      "nodeId": "638951909c2acdb5e789aa22"
    },
    {
      "name": "main-entrance",
      "displayName": "Entrance",
      "parent": "638951909c2acdb5e789aa22",
      "rootId": "638951909c2acdb5e789aa22",
      "nodeInfo": {
        "isDevice": true
      },
      "nodeId": "63895a0711f0927f59e02bb3"
    }
  ]
}
```

## Get User's Nodes

Find all nodes that are accessable by the user

### Request

- Route: `(GET) /nodes-client/user`
- Required headers:
  - Json Web Token (JWT) with user access
- Query:
  | field | type | is optional | description |
  | :-------: | :------: | :---------: | :-------------------------------- |
  | `device_only` | `boolean` | ✅ | look only for _device nodes_ |

### Response

|  field  |    type    | is optional | description           |
| :-----: | :--------: | :---------: | :-------------------- |
| `user`  |  `Object`  |     ❌      | user information      |
| `nodes` | `Object[]` |     ❌      | list of fetched nodes |

**User**
| field | type | is optional | description |
| :-----: | :---------: | :---------: | :-------------------- |
| `userId` | `string` | ❌ | user's id |
| `rootId` | `string` | ❌ | user's root id |
| `name` | `string` | ❌ | first name |
| `last` | `string` | ❌ | last name |
| `username` | `string` | ❌ | username |
| `access` | `string[]` | ❌ | list of accessable paths |
| `roles` | `string[]` | ❌ | list of roles (server use only) |

**Node**
| field | type | is optional | description |
| :-----: | :---------: | :---------: | :-------------------- |
| `nodeId` | `string` | ❌ | node's id |
| `rootId` | `string` | ❌ | node's root id |
| `parent` | `string` | ❌ | node's parent id |
| `name` | `string` | ❌ | node's name |
| `displayName` | `string` | ❌ | node's display name |
| `nodeInfo` | `Object` | ❌ | node's additional information |

**Node Info**
| field | type | is optional | description |
| :--------------: | :------: | :---------: | :----------------------------------------- |
| `isDevice` | `boolean` | ❌ | `true` for _device nodes_ and `false` elsewhere |

### Example

```bash
# Request
curl -H 'Authorization: Bearer eus87...Y7Hs' \
localhost:3000/nodes-client/user?is_device=true
```

```jsonc
// Response
{
  "user": {
    "name": "nicolas",
    "last": "dominguez",
    "username": "ndomx",
    "access": ["home"],
    "rootId": "638951909321fdb5e789aa22",
    "roles": ["admin", "user"],
    "userId": "6389b3a40a7c03ca5c49f4d9"
  },
  "nodes": [
    {
      "name": "main-entrance",
      "displayName": "Entrance",
      "parent": "638951909321fdb5e789aa22",
      "rootId": "638951909321fdb5e789aa22",
      "nodeInfo": {
        "isDevice": true
      },
      "nodeId": "63895a0711f0927f59e02bb3"
    },
    {
      "name": "gate",
      "name": "Side Door",
      "parent": "63895a2d11f0927f59e02bb7",
      "rootId": "638951909c2acdb5e789aa22",
      "nodeInfo": {
        "isDevice": true
      },
      "nodeId": "63895a3e11f0927f59e02bbc"
    }
  ]
}
```

## Get Matching Nodes

Find all nodes that match with the provided prefix

### Request

- Route: `(GET) /nodes-client/match`
- Required headers:
  - Json Web Token (JWT) with admin access
- Query:
  | field | type | is optional | description |
  | :-------: | :------: | :---------: | :-------------------------------- |
  | `prefix` | `string` | ❌ | prefix for node query |

### Response

|  field  |    type    | is optional | description           |
| :-----: | :--------: | :---------: | :-------------------- |
| `nodes` | `Object[]` |     ❌      | list of fetched nodes |

**Node**
| field | type | is optional | description |
| :-----: | :---------: | :---------: | :-------------------- |
| `nodeId` | `string` | ❌ | node's id |
| `rootId` | `string` | ❌ | node's root id |
| `parent` | `string` | ❌ | node's parent id |
| `name` | `string` | ❌ | node's name |
| `displayName` | `string` | ❌ | node's display name |
| `nodeInfo` | `Object` | ❌ | node's additional information |

**Node Info**
| field | type | is optional | description |
| :--------------: | :------: | :---------: | :----------------------------------------- |
| `isDevice` | `boolean` | ❌ | `true` for _device nodes_ and `false` elsewhere |

### Example

```bash
# Request
curl -H 'Authorization: Bearer eus87...Y7Hs' \
localhost:3000/nodes-client/match?prefix=home/3rd-floor
```

```jsonc
// Response
{
  "nodes": [
    {
      "name": "3rd-floor",
      "displayName": "3rd Floor",
      "parent": "638951909c2acdb5e789aa22",
      "rootId": "638951909c2acdb5e789aa22",
      "nodeInfo": {
        "isDevice": false
      },
      "nodeId": "63895a2d11f0927f59e02bb7"
    },
    {
      "name": "gate",
      "displayName": "gate",
      "parent": "63895a2d11f0927f59e02bb7",
      "rootId": "638951909c2acdb5e789aa22",
      "nodeInfo": {
        "isDevice": true
      },
      "nodeId": "63895a3e11f0927f59e02bbc"
    }
  ]
}
```

## Update Node

Updates a node

### Request

- HTTP method: `(PATCH) /nodes-client/:nodeId`
- Required headers:
  - Json Web Token (JWT) with admin access
- Params:
  | field | type | is optional | description |
  | :-------: | :------: | :---------: | :-------------------------------- |
  | `nodeId` | `string` | ❌ | node's id |
- Body:
  | field | type | is optional | description |
  | :--------------: | :------: | :---------: | :----------------------------------------- |
  | `root_id` | `string` | ✅ | node's root id |
  | `parent` | `string` | ✅ | node's parent id |
  | `name` | `string` | ✅ | node's name |
  | `display_name` | `string` | ✅ | node's display name |
  | `node_info` | `Object` | ✅ | node's additional info |

  **Node Info**
  | field | type | is optional | description |
  | :--------------: | :------: | :---------: | :----------------------------------------- |
  | `is_device` | `boolean` | ❌ | `true` for _device nodes_ and `false` elsewhere |

### Response

|     field     |   type   | is optional | description                                |
| :-----------: | :------: | :---------: | :----------------------------------------- |
|   `nodeId`    | `string` |     ❌      | node's id                                  |
|   `rootId`    | `string` |     ❌      | node's root id                             |
|   `parent`    | `string` |     ❌      | node's parent id                           |
|    `name`     | `string` |     ❌      | node's name (used for path and MQTT topic) |
| `displayName` | `string` |     ❌      | node's display name                        |
|  `nodeInfo`   | `Object` |     ❌      | node information                           |

**Node Info**
| field | type | is optional | description |
| :--------------: | :------: | :---------: | :----------------------------------------- |
| `isDevice` | `boolean` | ❌ | `true` for _device nodes_ and `false` elsewhere |

### Example

```bash
# Request
curl \
-X PATCH \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer su87...Hs89' \
-d '{
    "root_id": "636674f1e0ac56ce4ff1949c",
    "node": {
        "parent": "636674f1e0ac56cf4ff1949c",
        "node_info": {
            "is_device": false
        }
    }
}' \
localhost:3000/nodes-client/63895a3e11f0927f59e02bbc
```

```jsonc
// Response
{
  "nodeId": "6366abf1e0ac56ce4ff1949c",
  "rootId": "636674f1e0ac56ce4ff1949c",
  "parent": "636674f1e0ac56cf4ff1949c",
  "path": "home/test-gate",
  "displayName": "test-gate",
  "nodeInfo": {
    "isDevice": false
  }
}
```

## Delete Node

### Request

- Route: `(DELETE) /nodes-client/:nodeId`
- Required headers:
  - Json Web Token (JWT) with admin access
- Params:
  | field | type | is optional | description |
  | :-------: | :------: | :---------: | :-------------------------------- |
  | `nodeId` | `string` | ❌ | node's id |

### Response

|     field     |   type   | is optional | description                                |
| :-----------: | :------: | :---------: | :----------------------------------------- |
|   `nodeId`    | `string` |     ❌      | deleted node id                            |
|   `rootId`    | `string` |     ❌      | node's root id                             |
|   `parent`    | `string` |     ❌      | node's parent id                           |
|    `name`     | `string` |     ❌      | node's name (used for path and MQTT topic) |
| `displayName` | `string` |     ❌      | node's display name                        |
|  `nodeInfo`   | `Object` |     ❌      | node information                           |

**Node Info**
| field | type | is optional | description |
| :--------------: | :------: | :---------: | :----------------------------------------- |
| `isDevice` | `boolean` | ❌ | `true` for _device nodes_ and `false` elsewhere |

### Example

```bash
curl \
-X DELETE \
-H 'Authorization: Bearer su87...Hs89' \
localhost:3000/nodes-client/6366abf1e0ac56ce4ff1949c
```

```jsonc
// Response
{
  "nodeId": "6366abf1e0ac56ce4ff1949c",
  "rootId": "636674f1e0ac56ce4ff1949c",
  "parent": "636674f1e0ac56cf4ff1949c",
  "name": "test-gate",
  "displayName": "test-gate",
  "nodeInfo": {
    "isDevice": false
  }
}
```
