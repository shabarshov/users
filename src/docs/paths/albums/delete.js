const components = require("#docs/components/index")
const { tagNames } = require("#docs/tags")

const Delete = {
  tags: tagNames.albums,
  summary: "Delete album",
  description: "Delete an album from a user by **album_id** and **user_id**",
  parameters: [
    {
      name: "album_id",
      in: "path",
      required: true,
      schema: {
        type: "integer",
        format: "int64",
      },
    },
    {
      name: "user_id",
      in: "query",
      required: true,
      schema: {
        type: "integer",
        format: "int64",
      },
    },
  ],
  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: components.ResponseNull,
        },
      },
    },
    ...components.ResponseErrors,
  },
}

module.exports = Delete
