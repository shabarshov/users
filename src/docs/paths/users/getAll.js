const components = require("#docs/components/index")
const { tagNames } = require("#docs/tags")

const Get = {
  tags: tagNames.users,
  summary: "Get all users",
  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: components.ResponseUsers,
        },
      },
    },
    ...components.ResponseErrors,
  },
}

module.exports = Get
