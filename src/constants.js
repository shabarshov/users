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

const logFilePaths = {
  node: {
    errors: "./logs/node/errors.log",
    info: "./logs/node/info.log",
  },
  sequelize: {
    errors: "./logs/sequelize/errors.log",
    info: "./logs/sequelize/info.log",
  },
}

const historyLimit = 5

const apiUrl = "http://sound-data.local/api"

module.exports = {
  requestBodyKeys,
  logFilePaths,
  historyLimit,
  apiUrl,
}
