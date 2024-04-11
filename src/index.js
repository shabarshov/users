require("dotenv").config()

const express = require("express")

const sequelize = require("#config/db")

const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("#docs/users")

const usersRoutes = require("#routes/users")
const songsRoutes = require("#routes/songs")
const historyRoutes = require("#routes/history")
const albumsRoutes = require("#routes/albums")

const PORT = process.env.PORT || 8080

const app = express()

app.use(express.json())
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use("/users", usersRoutes)
app.use("/songs", songsRoutes)
app.use("/history", historyRoutes)
app.use("/albums", albumsRoutes)

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
