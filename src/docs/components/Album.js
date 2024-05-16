const Album = {
  type: "object",
  required: ["id", "name", "img", "songs"],
  properties: {
    id: {
      type: "integer",
      format: "int64",
      example: 10,
    },
    name: {
      type: "string",
      example: "Star",
    },
    img: {
      type: "string",
      format: "url",
      example:
        "https://vk.com/music/album/-2000072434_72434_ad5d00c2ea603f568c",
    },
    songs: {
      type: "array",
      example: [12, 10, 3, 17],
      items: {
        type: "integer",
      },
    },
  },
}

module.exports = Album
