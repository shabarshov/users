const albumService = require("#services/albumService")
const userService = require("#services/userService")
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

    const existingAlbum = await albumService.getAlbum(albumData)

    if (existingAlbum) {
      return res.status(403).json({
        errors: [{ code: 403, message: "That album already exists" }],
      })
    }

    console.log("From controller: ")
    console.log(albumData)
    const newAlbum = await albumService.addAlbum(albumData)
    if (newAlbum) {
      return res.status(200).json({
        data: {
          id: newAlbum.id,
          user_id: newAlbum.userId,
          album_id: newAlbum.albumId,
        },
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