# Users Schema

Every user is composed of their personal information along with their access rights and the belonging organization, represented by the `rootId` (see [nodes](./nodes.md)). A person can have access privileges for two different organizations. Two achieve this, two users can be created with the same `personId` (see [people](./people.md)), but different `rootId`.

The `access` field provides a way to add access restrictions to users. The user has access to every node that matches with any element in the field.

```ts
{
    personId: string,
    rootId: string,
    access: string[],
}
```

> Note that addionally to the fields shown above, MongoDB adds a few more fields, like `_id` that will be used later in this document

### Example

Consider the following DB

```json
{
  "id": 0,
  "personId": 211,
  "access": ["building/entrance", "building/2nd-floor/apt27"]
}
```

In this example, user `0` has access to **every node** whose topic starts with `building/entrance` or `building/2nd-floor/apt27`.
