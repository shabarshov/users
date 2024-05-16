const Error400 = require("./Error400")
const Error401 = require("./Error401")
const Error403 = require("./Error403")
const Error404 = require("./Error404")
const Error500 = require("./Error500")

const ResponseErrors = {
  400: {
    description: "Bad Request",
    content: {
      "application/json": {
        schema: Error400,
      },
    },
  },
  401: {
    description: "Unauthorized",
    content: {
      "application/json": {
        schema: Error401,
      },
    },
  },
  403: {
    description: "Forbidden",
    content: {
      "application/json": {
        schema: Error403,
      },
    },
  },
  404: {
    description: "Not Found",
    content: {
      "application/json": {
        schema: Error404,
      },
    },
  },
  500: {
    description: "Internal Server Error",
    content: {
      "application/json": {
        schema: Error500,
      },
    },
  },
}

module.exports = ResponseErrors
