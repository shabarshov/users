const historyService = require("#services/database/historyService")
const userService = require("#services/database/userService")

const api = require("#services/api/soundDataSongsService")

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
    const responseSongs = []

    for (const key in userHistory) {
      const { ok, status, responseBody } = await api.getSongById(
        userHistory[key].songId
      )

      if (ok) {
        responseSongs.push(responseBody.data)
      }

      if (status === 500) {
        return res.status(500).json({
          errors: [{ code: 500, message: "Server error" }],
        })
      }

      if (status === 404) {
        await historyService.deleteSong({ songId: userHistory[key].songId })
      }
    }

    if (userHistory) {
      return res.status(200).json({
        data: responseSongs,
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
