const components = require("#docs/components/index")
const { tagNames } = require("#docs/tags")

const Patch = {
  tags: tagNames.users,
  summary: "Update user data",
  description: "Update user data by **user_id,** **username** and **password**",
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
  requestBody: {
    content: {
      "application/json": {
        schema: components.RequestPatchUser,
      },
    },
  },
  responses: {
    200: {
      description: "Successful operation",
      content: {
        "application/json": {
          schema: components.ResponseUser,
        },
      },
    },
    ...components.ResponseErrors,
  },
}

module.exports = Patch
