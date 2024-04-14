const components = require("#docs/components/index")

const Post = {
  tags: ["users"],
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
    400: {
      description: "Bad Request",
      content: {
        "application/json": {
          schema: components.Error400,
        },
      },
    },
    401: {
      description: "Unauthorized",
      content: {
        "application/json": {
          schema: components.Error401,
        },
      },
    },
    403: {
      description: "Forbidden",
      content: {
        "application/json": {
          schema: components.Error403,
        },
      },
    },
    404: {
      description: "Not Found",
      content: {
        "application/json": {
          schema: components.Error404,
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: components.Error500,
        },
      },
    },
  },
}

module.exports = Post
