const express = require("express")
const router = express.Router()

const createHistoryController = require("#controllers/history/createHistoryController")
const getHistoryController = require("#controllers/history/getHistoryController")
const clearHistoryController = require("#controllers/history/clearHistoryController")

router.post("/", createHistoryController)
router.get("/:userId", getHistoryController)
router.delete("/:userId", clearHistoryController)

module.exports = router
