const components = require("#docs/components/index")
const { tagNames } = require("#docs/tags")

const Post = {
  tags: tagNames.users,
  summary: "Create new user",
  description: "Create a new user by **username** and **password**",
  requestBody: {
    content: {
      "application/json": {
        schema: components.RequestPostUser,
      },
    },
  },
  responses: {
    200: {
      description: "Created",
      content: {
        "application/json": {
          schema: components.ResponseUser,
        },
      },
    },
    ...components.ResponseErrors,
  },
}

module.exports = Post
