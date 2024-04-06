require("dotenv").config()

const express = require("express")

const sequelize = require("./config/db")
// eslint-disable-next-line no-unused-vars
const { User, Song, Album, History } = require("./models/index")

const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("./docs/users.json")

const PORT = process.env.PORT || 8080

const app = express()
app.use(express.json())
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

const start = async () => {
  try {
    await sequelize.authenticate()
    console.log("Connection to the database has been established successfully")

    await sequelize.sync({ force: false })
    console.log("Database synchronized successfully")

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}...`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()
