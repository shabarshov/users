const userService = require("#services/database/userService")

const api = require("#services/api/soundDataPlaylistsService")

const { nodeLogger } = require("#config/logger")

const deleteUserController = async (req, res) => {
  try {
    const userId = req.params.userId

    if (isNaN(userId)) {
      return res.status(400).json({
        errors: [{ code: 400, message: "Bad Request" }],
      })
    }

    const deletedUser = await userService.deleteUserById(userId)

    if (!deletedUser) {
      return res.status(404).json({
        errors: [{ code: 404, message: "User with that id not found" }],
      })
    }

    const { ok, responseBody } = await api.getPlaylistByUserId(userId)

    if (ok) {
      for (let playlist = 0; playlist < responseBody.data.length; playlist++) {
        await api.deletePlaylistById(playlist.id)
      }
    }

    return res.status(200).json({ data: {} })
  } catch (e) {
    nodeLogger.error(e)
    return res.status(500).json({
      errors: [{ code: 500, message: "Server Error" }],
    })
  }
}

module.exports = deleteUserController
