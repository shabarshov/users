const User = {
  type: "object",
  properties: {
    username: {
      type: "string",
      example: "username",
    },
    password: {
      type: "string",
      example: "password",
    },
  },
}

module.exports = User
