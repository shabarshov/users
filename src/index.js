import express from "express"

const PORT = 8080

const app = express()

app.get("/", (req, res) => {
  console.log("GET /")
  res.json({ message: "Hello, world!" })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`)
})
