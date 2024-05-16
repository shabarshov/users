const components = require("#docs/components/index")
const { tagNames } = require("#docs/tags")

const Delete = {
  tags: tagNames.songs,
  summary: "Delete song",
  description: "Delete a song by **user_id** and **song_id**",
  parameters: [
    {
      name: "song_id",
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
