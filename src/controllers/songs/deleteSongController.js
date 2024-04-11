const songService = require("#services/songService")
const { nodeLogger } = require("#config/logger")

const deleteSongController = async (req, res) => {
  try {
    const songId = req.params.songId
    const userId = req.query.user_id

    if (isNaN(userId) || isNaN(songId)) {
      return res.status(400).json({
        errors: [{ code: 400, message: "Bad Request" }],
      })
    }

    const deletedSong = await songService.deleteSong({ songId, userId })
    if (!deletedSong) {
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

module.exports = deleteSongController
