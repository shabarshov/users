const components = require("#docs/components/index")
const { tagNames } = require("#docs/tags")

const Post = {
  tags: tagNames.songs,
  summary: "Add song to the user",
  description: "Add a song to the user by **user_id** and **song_id**",
  requestBody: {
    content: {
      "application/json": {
        schema: components.RequestUserSong,
      },
    },
  },
  responses: {
    200: {
      description: "Successfully added",
      content: {
        "application/json": {
          schema: components.ResponseSong,
        },
      },
    },
    ...components.ResponseErrors,
  },
}

module.exports = Post
