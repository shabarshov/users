const Genre = {
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
      example: "pop",
    },
  },
}

module.exports = Genre
