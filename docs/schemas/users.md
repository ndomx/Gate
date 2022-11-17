# Users Schema

Every user is composed of their personal information along with their permissions. The field `access` provides information about the user's access rights (i.e. which doors are available). The field `admin` provides information about the nodes this user can administrate. That is, add/remove users.

Both fields `access` and `admin` work the same way: Every element consists of a `rootId` pointing to a _root node_ (see [nodes](./nodes.md)) and a prefix that must match with the request.

```ts
{
    name: string,
    last: string,
    admin: [
        {
            rootId: string,
            prefix: string
        }
    ],
    access: [
        {
            rootId: string,
            prefix: string
        }
    ]
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
  "admin": [
    {
      "rootId": 1,
      "prefix": "building/2nd-floor/apt27"
    }
  ],
  "access": [
    {
      "rootId": 1,
      "prefix": "building/entrance"
    },
    {
      "rootId": 1,
      "prefix": "building/2nd-floor/apt27"
    }
  ]
}
```

In this example, user `0` has access to **every node** whose topic starts with `building/entrance` or `building/2nd-floor/apt27`; and has admin privileges for **every node** whose topic starts with `building/2nd-floor/apt27`.
