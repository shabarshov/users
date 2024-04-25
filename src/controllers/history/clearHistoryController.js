const historyService = require("#services/database/historyService")
const userService = require("#services/database/userService")
const { nodeLogger } = require("#config/logger")

const clearHistoryController = async (req, res) => {
  try {
    const userId = req.params.userId

    if (isNaN(userId)) {
      return res.status(400).json({
        errors: [{ code: 400, message: "Bad Request" }],
      })
    }

    const existingUser = await userService.getUserById(userId)

    if (!existingUser) {
      return res.status(404).json({
        errors: [{ code: 404, message: "That user not found" }],
      })
    }

    const deletedSongs = await historyService.clearHistoryByUserId(userId)

    if (!deletedSongs) {
      return res.status(404).json({
        errors: [{ code: 404, message: "Not Found" }],
      })
    }

    return res.status(200).json({ data: {} })
  } catch (e) {
    nodeLogger.error(e)
    return res.status(500).json({
      errors: [{ code: 500, message: "Server Error" }],
    })
  }
}

module.exports = clearHistoryController
