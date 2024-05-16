const Album = require("./Album")

const ResponseAlbums = {
  type: "object",
  properties: {
    data: {
      type: "array",
      items: Album,
    },
  },
}

module.exports = ResponseAlbums
