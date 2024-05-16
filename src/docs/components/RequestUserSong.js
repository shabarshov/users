const RequestUserSong = {
  type: "object",
  required: ["user_id", "song_id"],
  properties: {
    user_id: {
      type: "integer",
      format: "int64",
      example: 10,
    },
    song_id: {
      type: "integer",
      format: "int64",
      example: 10,
    },
  },
}

module.exports = RequestUserSong
