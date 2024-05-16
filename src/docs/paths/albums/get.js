const components = require("#docs/components/index")
const { tagNames } = require("#docs/tags")

const Get = {
  tags: tagNames.albums,
  summary: "Get albums",
  description: "Get all user's albums by **user_id**",
  parameters: [
    {
      name: "user_id",
      in: "path",
      required: true,
      schema: {
        type: "integer",
        format: "int64",
      },
    },
  ],
  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: components.ResponseAlbums,
        },
      },
    },
    ...components.ResponseErrors,
  },
}

module.exports = Get
