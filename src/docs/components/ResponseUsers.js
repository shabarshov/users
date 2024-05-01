const ResponseUser = require("./ResponseUser")

const ResponseUsers = {
  type: "object",
  properties: {
    data: {
      type: "array",
      items: ResponseUser.properties.data,
    },
  },
}

module.exports = ResponseUsers
