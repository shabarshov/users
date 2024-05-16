const components = require("#docs/components/index")
const { tagNames } = require("#docs/tags")

const Delete = {
  tags: tagNames.users,
  summary: "Delete user",
  description: "Delete a user by **password**",
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
          schema: {
            $ref: "#/components/schemas/ResponseNull",
          },
        },
      },
    },
    ...components.ResponseErrors,
  },
}

module.exports = Delete
