# Nodes

## Create Node

### Request

- HTTP method: `POST`
- Body:

|      field       |   type   | is optional | description                                |
| :--------------: | :------: | :---------: | :----------------------------------------- |
|    `root_id`     | `string` |     ❌      | Root ID to host the created node           |
|    `admin_id`    | `string` |     ❌      | Admin ID with access to the requested root |
|      `path`      | `string` |     ❌      | Hierarchical loaction of the node          |
| `create_options` | `Object` |     ✅      | Additional options (not implemented yet)   |
|   `node_info`    | `Object` |     ❌      | Node additional information                |

**Create Options** (Not implemeted yet)
| field | type | is optional | description |
| :--------------: | :------: | :---------: | :----------------------------------------- |
| `create_intermidiate` | `boolean` | ✅ | Create missing nodes to complete path |

**Node Info**
| field | type | is optional | description |
| :--------------: | :------: | :---------: | :----------------------------------------- |
| `is_device` | `boolean` | ❌ | `true` for _device nodes_ and `false` elsewhere |

### Response

|   field    |   type   | is optional | description                                |
| :--------: | :------: | :---------: | :----------------------------------------- |
|  `nodeId`  | `string` |     ❌      | Created node ID                            |
|  `rootId`  | `string` |     ❌      | Node's root ID                             |
|  `parent`  | `string` |     ❌      | Node's parent ID                           |
|   `name`   | `string` |     ❌      | Node's name (used for path and MQTT topic) |
| `nodeInfo` | `Object` |     ❌      | Node information                           |

**Node Info**
| field | type | is optional | description |
| :--------------: | :------: | :---------: | :----------------------------------------- |
| `isDevice` | `boolean` | ❌ | `true` for _device nodes_ and `false` elsewhere |

### Example

```jsonc
// Request
{
    "admin_id": "638178c1b1348308cc1e37be",
    "root_id": "636674f1e0ac56ce4ff1949c",
    "path": "home/test-gate",
    "node_info": {
        "is_device": true
    }
}

// Response
{
    "nodeId": "636674f101ac56ce4ff1949c",
    "rootId": "632174f101ac56ce4ff1949c",
    "parent": "63ca74f101ac56ce4ff1949c",
    "path": "home/test-gate",
    "nodeInfo": {
        "isDevice": true
    }
}
```

## Get Nodes

### Request

- HTTP method: `GET`
- Params:
  | field | type | is optional | description |
  | :-------: | :------: | :---------: | :-------------------------------- |
  | `admin_id` | `string` | ❌ | Admin ID |

- Query Params:
  | field | type | is optional | description |
  | :-------: | :------: | :---------: | :-------------------------------- |
  | `user_id` | `string` | ✅ | Filter nodes by user's access |
  | `path` | `string` | ✅ | Filter nodes that match with path |

### Response

|  field  |    type    | is optional | description           |
| :-----: | :--------: | :---------: | :-------------------- |
| `nodes` | `string[]` |     ❌      | List of fetched nodes |

### Example

```bash
# Request
curl localhost:3000/nodes/63ca74f101ac56ce4ff1949c\
user_id=63ca74f101abd6ce4ff1949c&\
path_id=home/node1/node2
```

```jsonc
// Response
{
  "nodes": [
    "63ca74f101ac56ce4ff1949c",
    "63ca74f101ac56de4ff1949c",
    "63ca74f101acfffe4ff1949c",
    "632174f101ac56ce4ff1949c"
  ]
}
```

## Update Node

### Request

- HTTP method: `PATCH`
- Body:

|      field       |   type   | is optional | description                                |
| :--------------: | :------: | :---------: | :----------------------------------------- |
|    `node_id`     | `string` |     ❌      | Node to update                             |
|    `root_id`     | `string` |     ❌      | Root ID to host the created node           |
|    `admin_id`    | `string` |     ❌      | Admin ID with access to the requested root |
|      `node`      | `Object` |     ❌      | Node update details                        |
| `update_options` | `Object` |     ✅      | Additional options (not implemented yet)   |

**Node**
| field | type | is optional | description |
| :--------------: | :------: | :---------: | :----------------------------------------- |
| `parent` | `string` | ✅ | New node's parent node |
| `name` | `string` | ✅ | New node's name |
| `node_info` | `Object` | ✅ | New node's additional information |

**Node Info**
| field | type | is optional | description |
| :--------------: | :------: | :---------: | :----------------------------------------- |
| `is_device` | `boolean` | ❌ | `true` for _device nodes_ and `false` elsewhere |

**Update Options** (Not implemeted yet)
| field | type | is optional | description |
| :--------------: | :------: | :---------: | :----------------------------------------- |
| `create_intermidiate` | `boolean` | ✅ | Create missing nodes to complete path |

### Response

|   field    |   type   | is optional | description                                |
| :--------: | :------: | :---------: | :----------------------------------------- |
|  `nodeId`  | `string` |     ❌      | Created node ID                            |
|  `rootId`  | `string` |     ❌      | Node's root ID                             |
|  `parent`  | `string` |     ❌      | Node's parent ID                           |
|   `name`   | `string` |     ❌      | Node's name (used for path and MQTT topic) |
| `nodeInfo` | `Object` |     ❌      | Node information                           |

**Node Info**
| field | type | is optional | description |
| :--------------: | :------: | :---------: | :----------------------------------------- |
| `isDevice` | `boolean` | ❌ | `true` for _device nodes_ and `false` elsewhere |

### Example

```jsonc
// Request
{
    "admin_id": "638178c1b1348308cc1e37be",
    "root_id": "636674f1e0ac56ce4ff1949c",
    "node_id": "6366abf1e0ac56ce4ff1949c",
    "node": {
        "parent": "636674f1e0ac56cf4ff1949c",
        "node_info": {
            "is_device": false
        }
    }
}

// Response
{
    "nodeId": "6366abf1e0ac56ce4ff1949c",
    "rootId": "636674f1e0ac56ce4ff1949c",
    "parent": "636674f1e0ac56cf4ff1949c",
    "path": "home/test-gate",
    "nodeInfo": {
        "isDevice": false
    }
}
```

## Delete Node

### Request

- HTTP method: `DELETE`
- Body:

|      field       |   type   | is optional | description                                |
| :--------------: | :------: | :---------: | :----------------------------------------- |
|    `node_id`     | `string` |     ❌      | Node to update                             |
|    `root_id`     | `string` |     ❌      | Root ID to host the created node           |
|    `admin_id`    | `string` |     ❌      | Admin ID with access to the requested root |

### Response

|   field    |   type   | is optional | description                                |
| :--------: | :------: | :---------: | :----------------------------------------- |
|  `nodeId`  | `string` |     ❌      | Created node ID                            |
|  `rootId`  | `string` |     ❌      | Node's root ID                             |
|  `parent`  | `string` |     ❌      | Node's parent ID                           |
|   `name`   | `string` |     ❌      | Node's name (used for path and MQTT topic) |
| `nodeInfo` | `Object` |     ❌      | Node information                           |

**Node Info**
| field | type | is optional | description |
| :--------------: | :------: | :---------: | :----------------------------------------- |
| `isDevice` | `boolean` | ❌ | `true` for _device nodes_ and `false` elsewhere |

### Example

```jsonc
// Request
{
    "admin_id": "638178c1b1348308cc1e37be",
    "root_id": "636674f1e0ac56ce4ff1949c",
    "node_id": "6366abf1e0ac56ce4ff1949c"
}

// Response
{
    "nodeId": "6366abf1e0ac56ce4ff1949c",
    "rootId": "636674f1e0ac56ce4ff1949c",
    "parent": "636674f1e0ac56cf4ff1949c",
    "path": "home/test-gate",
    "nodeInfo": {
        "isDevice": false
    }
}
```
