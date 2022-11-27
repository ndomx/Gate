# Admin Schema

Admin users manage organizations (defined by their root node). That is, they have the power to add/read/update/delete nodes and users inside of an organization.

The `roots` field contains a list of every root node to which the user has admin rights.

> See [people schema](./people.md), [nodes schema](./nodes.md)

```ts
{
    personId: string,
    username: string,
    password: string,
    roots: string[],
}
```
