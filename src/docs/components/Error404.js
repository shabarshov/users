const Error = require("./Error")

const Error404 = {
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
        code: "404",
        message: "Not Found",
        meta: {
          additional_info: "Additional information about the error",
        },
      },
    ],
  },
}

module.exports = Error404
