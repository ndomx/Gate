# Gates Schema

Gates are stored as a tree in MongoDB where each leaf only knows about its parent and doesn't who their children are. Every node that doesn't have a parent is called a _root node_.

Additionally, in this representation, there'll be many nodes that don't control any physical device, called _abstract nodes_. Their function is to provide a cleaner tree representation. Because of that, every node has an `isDevice` field that indicates wether the node is connected to a physical device or is an _abstract node_.

```ts
{
    name: string,
    parent: string,
    isDevice: boolean
}
```

> Note that addionally to the fields shown above, MongoDB adds a few more fields, like `_id` that will be used later in this document

Each _device node_ is listening to a MQTT topic made of the names of each leaf in it path joined by a `/` character.

### Example

Consider the following DB

```json
[
  { "id": 0, "name": "building", "parent": "", "isDevice": false },
  { "id": 1, "name": "3rd-floor", "parent": 0, "isDevice": false },
  { "id": 2, "name": "main-gate", "parent": 0, "isDevice": true },
  { "id": 3, "name": "apt31-door", "parent": 1, "isDevice": true },
  { "id": 4, "name": "5th-floor", "parent": 0, "isDevice": false },
  { "id": 5, "name": "hallway-lights", "parent": 4, "isDevice": true },
  { "id": 6, "name": "house", "parent": "", "isDevice": false },
  { "id": 7, "name": "entrance", "parent": 6, "isDevice": true }
]
```

In this example, we have 2 root nodes: `0` and `6`. Each of these nodes has a tree below them as follows

```
building (id: 0, abstract)
|- main-gate (id: 2, device)
|- 3rd-floor (id: 1, abstract)
|   |- apt31-door (id: 3, device)
|- 5th-floor (id: 4, abstract)
|   |- hallway-lights (id: 5, device)

house (id: 6, abstract)
|- entrance (id: 7, device)
```

The MQTT topic for `apt31-door` would be `building/3rd-floor/apt31-door`.
