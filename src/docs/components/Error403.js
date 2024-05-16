const Error = require("./Error")

const Error403 = {
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
        code: "403",
        message: "Forbidden",
        meta: {
          additional_info: "Additional information about the error",
        },
      },
    ],
  },
}

module.exports = Error403
