const components = require("#docs/components/index")
const { tagNames } = require("#docs/tags")

const Post = {
  tags: tagNames.albums,
  summary: "Add new album",
  description: "Add a new album to the user by **user_id** and **album_id**",
  requestBody: {
    content: {
      "application/json": {
        schema: components.RequestAlbum,
      },
    },
  },
  responses: {
    200: {
      description: "Added",
      content: {
        "application/json": {
          schema: components.ResponseAlbum,
        },
      },
    },
    400: {
      description: "Bad Request",
      content: {
        "application/json": {
          schema: components.Error400,
        },
      },
    },
    401: {
      description: "Unauthorized",
      content: {
        "application/json": {
          schema: components.Error401,
        },
      },
    },
    403: {
      description: "Forbidden",
      content: {
        "application/json": {
          schema: components.Error403,
        },
      },
    },
    404: {
      description: "Not Found",
      content: {
        "application/json": {
          schema: components.Error404,
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: components.Error500,
        },
      },
    },
  },
}

module.exports = Post
