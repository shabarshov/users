const requestBodyKeys = {
  users: {
    post: {
      allowedKeys: ["username", "password"],
      requiredKeys: ["username", "password"],
    },
    patch: {
      allowedKeys: ["username", "password"],
    },
  },
  history: {
    post: {
      allowedKeys: ["user_id", "song_id"],
      requiredKeys: ["user_id", "song_id"],
    },
  },
  albums: {
    post: {
      allowedKeys: ["user_id", "album_id"],
      requiredKeys: ["user_id", "album_id"],
    },
  },
  songs: {
    post: {
      allowedKeys: ["user_id", "song_id"],
      requiredKeys: ["user_id", "song_id"],
    },
  },
}

module.exports = requestBodyKeys
