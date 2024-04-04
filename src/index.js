const express = require("express")
const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("./docs/users.json")

const PORT = 8080

const app = express()

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`)
})
