const components = require("#docs/components/index")
const { tagNames } = require("#docs/tags")

const Post = {
  tags: tagNames.history,
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
    ...components.ResponseErrors,
  },
}

module.exports = Post
