const Error = require("./Error")

const Error400 = {
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
        code: "400",
        message: "Bad Request",
        meta: {
          additional_info: "Additional information about the error",
        },
      },
    ],
  },
}

module.exports = Error400
