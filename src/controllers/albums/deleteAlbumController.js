const albumService = require("#services/albumService")
const { nodeLogger } = require("#config/logger")

const deleteAlbumController = async (req, res) => {
  try {
    const albumId = req.params.albumId
    const userId = req.query.user_id

    if (isNaN(userId) || isNaN(albumId)) {
      return res.status(400).json({
        errors: [{ code: 400, message: "Bad Request" }],
      })
    }

    const deletedAlbum = await albumService.deleteAlbum({ albumId, userId })
    if (!deletedAlbum) {
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

module.exports = deleteAlbumController
