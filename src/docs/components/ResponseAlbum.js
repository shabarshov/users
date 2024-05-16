const Album = require("./Album")

const ResponseAlbum = {
  type: "object",
  properties: {
    data: Album,
  },
}

module.exports = ResponseAlbum
