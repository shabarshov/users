const RequestAlbum = {
  type: "object",
  required: ["user_id", "album_id"],
  properties: {
    user_id: {
      type: "integer",
      format: "int64",
      example: 123,
    },
    album_id: {
      type: "integer",
      format: "int64",
      example: 123,
    },
  },
}

module.exports = RequestAlbum
