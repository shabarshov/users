const Album = require("./Album")
const Author = require("./Author")
const Error = require("./Error")
const Error400 = require("./Error400")
const Error401 = require("./Error401")
const Error403 = require("./Error403")
const Error404 = require("./Error404")
const Error500 = require("./Error500")
const Genre = require("./Genre")
const RequestAlbum = require("./RequestAlbum")
const RequestPatchUser = require("./RequestPatchUser")
const RequestPostUser = require("./RequestPostUser")
const RequestUserSong = require("./RequestUserSong")
const ResponseAlbum = require("./ResponseAlbum")
const ResponseAlbums = require("./ResponseAlbums")
const ResponseNull = require("./ResponseNull")
const ResponseSong = require("./ResponseSong")
const ResponseSongs = require("./ResponseSongs")
const ResponseUser = require("./ResponseUser")
const ResponseUsers = require("./ResponseUsers")
const Song = require("./Song")
const User = require("./User")

const ResponseErrors = require("./ResponseErrors")

module.exports = {
  Album,
  Author,
  Error,
  Error400,
  Error401,
  Error403,
  Error404,
  Error500,
  Genre,
  RequestAlbum,
  RequestPatchUser,
  RequestPostUser,
  RequestUserSong,
  ResponseAlbum,
  ResponseAlbums,
  ResponseNull,
  ResponseSong,
  ResponseSongs,
  ResponseUser,
  ResponseUsers,
  Song,
  User,

  ResponseErrors,
}
