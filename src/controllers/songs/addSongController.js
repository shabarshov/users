const songService = require("#services/database/songService")
const userService = require("#services/database/userService")
const api = require("#services/api/soundDataSongsService")
const { handleHttpStatusErrors } = require("#utils/errorHandler")
const objectValidator = require("#utils/objectValidator")
const { requestBodyKeys } = require("#constants")
const { nodeLogger } = require("#config/logger")

const addSongController = async (req, res) => {
  try {
    const songData = req.body

    if (
      objectValidator.isEmpty(songData) ||
      !objectValidator.hasAllKeys(
        songData,
        requestBodyKeys.songs.post.requiredKeys
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

    const alreadyAddedSong = await songService.getSong(songData)

    if (alreadyAddedSong) {
      return res.status(403).json({
        errors: [{ code: 403, message: "That song already exists" }],
      })
    }

    const { ok, status, responseBody } = await api.getSongById(songData.song_id)

    if (!ok) {
      return res.status(status).json(handleHttpStatusErrors(status))
    }

    const newSong = await songService.addSong(songData)

    if (newSong) {
      return res.status(200).json({
        ...responseBody,
      })
    }
  } catch (e) {
    nodeLogger.error(e)
    return res.status(500).json({
      errors: [{ code: 500, message: "Server Error" }],
    })
  }
}

module.exports = addSongController
