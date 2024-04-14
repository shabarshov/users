const components = require("#docs/components/index")

const Post = {
  tags: ["history"],
  summary: "Add song to history",
  description: "Add a song to the history by **user_id** and **song_id**",
  requestBody: {
    content: {
      "application/json": {
        schema: components.RequestUserSong,
      },
    },
  },
  responses: {
    200: {
      description: "Created",
      content: {
        "application/json": {
          schema: components.ResponseNull,
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
