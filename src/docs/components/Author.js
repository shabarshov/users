const Author = {
  type: "object",
  required: ["id", "name"],
  properties: {
    id: {
      type: "integer",
      format: "int64",
      example: 10,
    },
    name: {
      type: "string",
      example: "Savin Denis",
    },
  },
}

module.exports = Author
