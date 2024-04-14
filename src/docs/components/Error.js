const Error = {
  type: "object",
  required: ["code", "message"],
  properties: {
    code: {
      type: "string",
      description: "Error status code",
      enum: ["400", "401", "403", "404", "500"],
    },
    message: {
      type: "string",
      description: "Error message",
      example: "Error discription",
    },
    meta: {
      type: "object",
      description: "Meta data for the error",
      properties: {
        additionalInfo: {
          type: "string",
          description: "Additional information about the error",
        },
      },
    },
  },
}

module.exports = Error
