const Song = require("./Song")

const ResponseSongs = {
  type: "object",
  properties: {
    data: {
      type: "array",
      items: Song,
    },
  },
}

module.exports = ResponseSongs
