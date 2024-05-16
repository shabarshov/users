const User = require("./User")

const RequestPostUser = {
  required: ["username", "password"],
  properties: User.properties,
}

module.exports = RequestPostUser
