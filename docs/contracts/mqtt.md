# MQTT

MQTT is the protocol used to communicate from the server to the physical devices. For more information, visit <https://mqtt.org/>.

## Topic structure

Every device is represented by a _device node_ in the server (see [nodes](./http/nodes.md)), that has a corresponding path to it from its root. Physical devices subscribe to a topic that correspond to their corresponding node's path, preceded by the root's id.

**Example**
Consider a smart switch that is represented by a node with the following properties:

```jsonc
{
  "name": "smart-switch",
  "path": "home/bedroom",
  "rootId": "123"
  // other properties
}
```

Thus, the smart switch should be subscribed to the topic `123/home/bedroom/smart-switch`

## Payload

|   field   |   type   | is optional | description      |
| :-------: | :------: | :---------: | :--------------- |
| `action`  | `string` |     ❌      | requested action |
| `pattern` | `string` |     ❌      | mqtt topic       |

> **NOTE**: this contract is under development and can (probably will) change drastically in the future \
> **NOTE 2**: the `pattern` field is sent automatically by the MQTT client used in the server app.

For the time being, the only action supported is `open`. But more actions will be added in the future.
