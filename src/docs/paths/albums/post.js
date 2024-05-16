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
    ...components.ResponseErrors,
  },
}

module.exports = Post
