const components = require("#docs/components/index")
const { tagNames } = require("#docs/tags")

const Get = {
  tags: tagNames.history,
  summary: "Get history",
  description: "Get the user's history by **user_id**",
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
