# Users Schema

Every user is composed of their personal information along with their access rights and their belonging organization, represented by the `rootId` (see [nodes](./nodes.md)).

The `access` field provides a way to add access restrictions to users. The user has access to every node that matches with any element in the field.

Additionally, every user has a list of `roles`, that determine their server's access privileges. That is, the ability to add/delete users and nodes.

```ts
{
    name: string;
    last: string;
    username: string;
    password: string;
    rootId: string,
    access: string[],
    roles: string[]
}
```

> Note that addionally to the fields shown above, MongoDB adds a few more fields, like `_id` that will be used later in this document

### Example

Consider the following DB

```json
{
  "id": 0,
  "name": "nicolas",
  "last": "dominguez",
  "username": "ndomx",
  "password": "<hashed-password>",
  "rootId": "h888",
  "access": ["building/entrance", "building/2nd-floor/apt27"],
  "roles": ["admin", "user"]
}
```

In this example, user `0` has access to **every node** whose topic starts with `building/entrance` or `building/2nd-floor/apt27`. To activate these nodes, he also requires the `user` role.
