const components = require("#docs/components/index")
const { tagNames } = require("#docs/tags")

const Delete = {
  tags: tagNames.history,
  summary: "Clear history",
  description: "Delete all songs from the user's history by **user_id**",
  parameters: [
    {
      name: "user_id",
      in: "path",
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
