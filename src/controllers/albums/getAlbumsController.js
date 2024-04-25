const albumService = require("#services/database/albumService")
const userService = require("#services/database/userService")

const api = require("#services/api/soundDataAlbumsService")

const { nodeLogger } = require("#config/logger")

const getAlbumsController = async (req, res) => {
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

    const userAlbums = await albumService.getAlbumsByUserId(userId)

    const responseAlbums = []

    for (const key in userAlbums) {
      const { ok, responseBody } = await api.getAlbumById(
        userAlbums[key].albumId
      )

      if (ok) {
        responseAlbums.push(responseBody.data)
      } else {
        await albumService.deleteAlbum({ albumId: userAlbums[key].albumId })
      }
    }

    if (userAlbums) {
      return res.status(200).json({
        data: [
          ...userAlbums.map((album) => {
            return {
              id: album.id,
              albumId: album.albumId,
              userId: album.userId,
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

module.exports = getAlbumsController
