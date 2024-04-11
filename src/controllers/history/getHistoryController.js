const historyService = require("#services/historyService")
const userService = require("#services/userService")
const { nodeLogger } = require("#config/logger")

const getHistoryController = async (req, res) => {
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
        errors: [{ code: 404, message: "Not Found" }],
      })
    }

    const userHistory = await historyService.getSongsByUserId(userId)
    if (userHistory) {
      return res.status(200).json({
        data: [
          ...userHistory.map((song) => {
            return {
              id: song.id,
              songId: song.songId,
              userId: song.userId,
            }
          }),
        ],
      })
    }
  } catch (e) {
    nodeLogger.error(e)
    return res.status(500).json({
      errors: [{ code: 500, message: "Server Error" }],
    })
  }
}

module.exports = getHistoryController
