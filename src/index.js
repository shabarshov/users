require("dotenv").config()
require("#models/index")

const FORCE_DB_SYNC = process.env.FORCE_DB_SYNC === "true" || false

const express = require("express")

const sequelize = require("#config/db")

const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("#docs/index")

const usersRoutes = require("#routes/users")
const songsRoutes = require("#routes/songs")
const historyRoutes = require("#routes/history")
const albumsRoutes = require("#routes/albums")

const PORT = process.env.PORT || 8080

const app = express()

app.use(express.json())
app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use("/api/v1/users", usersRoutes)
app.use("/api/v1/songs", songsRoutes)
app.use("/api/v1/history", historyRoutes)
app.use("/api/v1/albums", albumsRoutes)

app.use((req, res) => {
  res.status(404).json({
    errors: [{ code: 404, message: "Not Found" }],
  })
})

const start = async () => {
  try {
    await sequelize.authenticate()
    console.log("Connection to the database has been established successfully")

    await sequelize.sync({ force: FORCE_DB_SYNC })
    console.log("Database synchronized successfully")

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}...`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()
