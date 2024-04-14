const User = require("./User")

const ResponseUser = {
  properties: {
    data: {
      required: ["username", "password", "id"],
      type: "object",
      properties: {
        id: {
          type: "integer",
          format: "int64",
          example: 123,
        },
        ...User.properties,
      },
    },
  },
}

module.exports = ResponseUser
