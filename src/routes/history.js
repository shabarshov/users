const express = require("express")
const router = express.Router()

const createHistoryController = require("#controllers/history/createHistoryController")
const getHistoryController = require("#controllers/history/getHistoryController")

router.post("/", createHistoryController)
router.get("/:userId", getHistoryController)

module.exports = router
