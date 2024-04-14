const User = {
  type: "object",
  properties: {
    username: {
      type: "string",
      example: "your_username",
    },
    password: {
      type: "string",
      example: "your_password",
    },
  },
}

module.exports = User
