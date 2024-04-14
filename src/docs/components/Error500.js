const Error = require("./Error")

const Error500 = {
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
        code: "500",
        message: "Internal Server Error",
        meta: {
          additional_info: "Additional information about the error",
        },
      },
    ],
  },
}

module.exports = Error500
