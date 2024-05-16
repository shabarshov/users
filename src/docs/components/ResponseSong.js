const Song = require("./Song")

const ResponseSong = {
  type: "object",
  properties: {
    data: Song,
  },
}

module.exports = ResponseSong
