const components = require("#docs/components/index")

const Get = {
  tags: ["users"],
  summary: "Get user",
  description: "Get user data by **user_id**",
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

module.exports = Get
