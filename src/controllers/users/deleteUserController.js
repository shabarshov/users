const userService = require("#services/userService")
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

    const responseUserPlaylists = await fetch(
      `http://sound-data.local/api/playlists/user/${userId}`
    )

    if (responseUserPlaylists.ok) {
      const userPlaylistsData = await responseUserPlaylists.json()

      for (let i = 0; i < userPlaylistsData.data.length; i++) {
        const playlistId = i.id

        await fetch(`http://sound-data.local/api/playlists/${playlistId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
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
