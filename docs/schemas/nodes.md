# Nodes Schema

_nodes_ are the link between the software layer and every physical device in the **Gate** ecosystem. Some nodes literally represent a physical device whereas the other nodes, that exist for management purposes. The first kind of nodes are called _device nodes_. This nodes are responsible for acting upon the hardware. The other kind of nodes are called _abstract nodes_. These provide a hierarchy tree where platform administrators can grant access to many devices just by enabling access to one node.

Each node contains a reference to its parent. And the node that does not have a parent node is called a _root node_. Root nodes represent an encapsulated organization. Might be a house, a building containing many apartments, etc.

Every node has the `nodeInfo.isDevice` field, that tells if the node is a _device node_ (`isDevice = true`) or if the node is abstract (`isDevice = false`). Trying to act upon an abstract node will throw an error.

```ts
{
    name: string,
    rootId: string,
    parent: string,
    nodeInfo: {
      isDevice: boolean
    }
}
```

> Note that addionally to the fields shown above, MongoDB adds a few more fields, like `_id` that will be used later in this document

> Root nodes should have an empty `rootId` field

Each _device node_ is listening to a MQTT topic made of the names of each leaf in its path joined by a `/` character.

### Example

Consider the following DB

```json
[
  {
    "id": 0,
    "name": "building",
    "rootId": "",
    "parent": "",
    "nodeInfo": { "isDevice": false }
  },
  {
    "id": 1,
    "name": "3rd-floor",
    "rootId": 0,
    "parent": 0,
    "nodeInfo": { "isDevice": false }
  },
  {
    "id": 2,
    "name": "main-gate",
    "rootId": 0,
    "parent": 0,
    "nodeInfo": { "isDevice": true }
  },
  {
    "id": 3,
    "name": "apt31-door",
    "rootId": 0,
    "parent": 1,
    "nodeInfo": { "isDevice": true }
  },
  {
    "id": 4,
    "name": "5th-floor",
    "rootId": 0,
    "parent": 0,
    "nodeInfo": { "isDevice": false }
  },
  {
    "id": 5,
    "name": "hallway-lights",
    "rootId": 0,
    "parent": 4,
    "nodeInfo": { "isDevice": true }
  },
  {
    "id": 6,
    "name": "house",
    "rootId": "",
    "parent": "",
    "nodeInfo": { "isDevice": false }
  },
  {
    "id": 7,
    "name": "entrance",
    "rootId": 6,
    "parent": 6,
    "nodeInfo": { "isDevice": true }
  }
]
```

In this example, we have 2 root nodes: `0` and `6`. Each of these nodes has a tree below them as follows

```
building (id: 0, abstract | root)
|- main-gate (id: 2, device)
|- 3rd-floor (id: 1, abstract)
|   |- apt31-door (id: 3, device)
|- 5th-floor (id: 4, abstract)
|   |- hallway-lights (id: 5, device)

house (id: 6, abstract | root)
|- entrance (id: 7, device)
```

The MQTT topic for `apt31-door` would be `building/3rd-floor/apt31-door`.
