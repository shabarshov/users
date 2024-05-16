const Author = require("./Author")
const Genre = require("./Genre")

const Song = {
  type: "object",
  required: ["id", "album_id", "author", "genre", "name", "audio"],
  properties: {
    id: {
      type: "integer",
      format: "int64",
      example: 10,
    },
    album_id: {
      type: "integer",
      format: "int64",
      example: 87362,
    },
    author: Author,
    genre: Genre,
    name: {
      type: "string",
      example: "Bismark",
    },
    audio: {
      type: "string",
      format: "url",
      example: "https://vk.com/audio-2001955681_110955681",
    },
  },
}

module.exports = Song
