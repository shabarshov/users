const tags = require("./tags")

const albumsRoutes = require("./paths/albums/index")
const historyRoutes = require("./paths/history/index")
const songsRoutes = require("./paths/songs/index")
const usersRoutes = require("./paths/users/index")

const components = require("./components/index")

const swaggerDocument = {
  openapi: "3.0.3",
  info: { title: "Users - OpenAPI 3.0", version: "1.0.0" },
  servers: [{ url: "http://users.local/api/v1" }],
  tags: tags,
  paths: {
    "/songs": { post: songsRoutes.Post },
    "/songs/{user_id}": { get: songsRoutes.Get },
    "/songs/{song_id}": { delete: songsRoutes.Delete },

    "/albums": { post: albumsRoutes.Post },
    "/albums/{user_id}": { get: albumsRoutes.Get },
    "/albums/{album_id}": { delete: albumsRoutes.Delete },

    "/users": { post: usersRoutes.Post },
    "/users/{user_id}": {
      get: usersRoutes.Get,
      patch: usersRoutes.Patch,
      delete: usersRoutes.Delete,
    },

    "/history": { post: historyRoutes.Post },
    "/history/{user_id}": {
      get: historyRoutes.Get,
      delete: historyRoutes.Delete,
    },
  },
  components: {
    schemas: {
      Author: components.Author,
      Genre: components.Genre,
      Song: components.Song,
      ResponseSong: components.ResponseSong,
      ResponseSongs: components.ResponseSongs,
      Album: components.Album,
      ResponseAlbum: components.ResponseAlbum,
      ResponseAlbums: components.ResponseAlbums,
      RequestAlbum: components.RequestAlbum,
      User: components.User,
      RequestPostUser: components.RequestPostUser,
      RequestPatchUser: components.RequestPatchUser,
      RequestUserSong: components.RequestUserSong,
      ResponseUser: components.ResponseUser,
      ResponseNull: components.ResponseNull,
      Error: components.Error,
      Error400: components.Error400,
      Error401: components.Error401,
      Error403: components.Error403,
      Error404: components.Error404,
      Error500: components.Error500,
    },
  },
}

module.exports = swaggerDocument
