const albumService = require("#services/database/albumService")
const userService = require("#services/database/userService")
const api = require("#services/api/soundDataAlbumsService")
const { handleHttpStatusErrors } = require("#utils/errorHandler")
const objectValidator = require("#utils/objectValidator")
const { requestBodyKeys } = require("#constants")
const { nodeLogger } = require("#config/logger")

const addAlbumController = async (req, res) => {
  try {
    const albumData = req.body

    if (
      objectValidator.isEmpty(albumData) ||
      !objectValidator.hasAllKeys(
        albumData,
        requestBodyKeys.albums.post.requiredKeys
      ) ||
      objectValidator.hasEmptyValues(albumData)
    ) {
      return res.status(400).json({
        errors: [{ code: 400, message: "Bad Request" }],
      })
    }

    const existingUser = await userService.getUserById(albumData.user_id)

    if (!existingUser) {
      return res.status(404).json({
        errors: [{ code: 404, message: "That user not found" }],
      })
    }

    const alreadyAddedAlbum = await albumService.getAlbum(albumData)

    if (alreadyAddedAlbum) {
      return res.status(403).json({
        errors: [{ code: 403, message: "That album already exists" }],
      })
    }

    const { ok, status, responseBody } = await api.getAlbumById(
      albumData.album_id
    )

    if (!ok) {
      return res.status(status).json(handleHttpStatusErrors(status))
    }

    const newAlbum = await albumService.addAlbum(albumData)
    if (newAlbum) {
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

module.exports = addAlbumController
