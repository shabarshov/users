const Delete = {
  tags: ["users"],
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
    400: {
      description: "Bad Request",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/Error400",
          },
        },
      },
    },
    401: {
      description: "Unauthorized",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/Error401",
          },
        },
      },
    },
    403: {
      description: "Forbidden",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/Error403",
          },
        },
      },
    },
    404: {
      description: "Not Found",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/Error404",
          },
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/Error500",
          },
        },
      },
    },
  },
}

module.exports = Delete
