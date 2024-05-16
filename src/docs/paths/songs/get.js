const components = require("#docs/components/index")
const { tagNames } = require("#docs/tags")

const Get = {
  tags: tagNames.songs,
  summary: "Get songs",
  description: "Get all the user's songs by **user_id**",
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
          schema: components.ResponseSongs,
        },
      },
    },
    ...components.ResponseErrors,
  },
}

module.exports = Get
