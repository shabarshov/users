const historyService = require("#services/historyService")
const userService = require("#services/userService")
const objectValidator = require("#utils/objectValidator")
const { requestBodyKeys } = require("#constants")
const { nodeLogger } = require("#config/logger")

const createHistoryController = async (req, res) => {
  try {
    const songData = req.body

    if (
      objectValidator.isEmpty(songData) ||
      !objectValidator.hasAllKeys(
        songData,
        requestBodyKeys.history.post.requiredKeys
      ) ||
      objectValidator.hasEmptyValues(songData)
    ) {
      return res.status(400).json({
        errors: [{ code: 400, message: "Bad Request" }],
      })
    }

    const existingUser = await userService.getUserById(songData.user_id)

    if (!existingUser) {
      return res.status(404).json({
        errors: [{ code: 404, message: "That user not found" }],
      })
    }

    const alreadyAddedSong = await historyService.getSong(songData)

    if (alreadyAddedSong) {
      return res.status(403).json({
        errors: [{ code: 403, message: "That song already exists" }],
      })
    }

    const responseSong = await fetch(
      `http://sound-data.local/api/songs/${songData.song_id}`
    )

    if (!responseSong.ok) {
      return res.status(404).json({
        errors: [{ code: 404, message: "That song not found" }],
      })
    }

    const newSong = await historyService.addSong(songData)

    if (newSong) {
      return res.status(200).json({
        ...responseSong,
      })
    }
  } catch (e) {
    nodeLogger.error(e)
    return res.status(500).json({
      errors: [{ code: 500, message: "Server Error" }],
    })
  }
}

module.exports = createHistoryController
