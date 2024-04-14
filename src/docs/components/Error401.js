const Error = require("./Error")

const Error401 = {
  type: "object",
  properties: {
    errors: {
      type: "array",
      items: Error,
    },
  },
  example: {
    errors: [
      {
        code: "401",
        message: "Unauthorized",
        meta: {
          additional_info: "Additional information about the error",
        },
      },
    ],
  },
}

module.exports = Error401
