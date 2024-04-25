const songService = require("#services/songService")
const userService = require("#services/userService")
const { nodeLogger } = require("#config/logger")

const getSongsController = async (req, res) => {
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

    const userSongs = await songService.getSongsByUserId(userId)

    const responseSongs = []

    for (const key in userSongs) {
      const responseSong = await fetch(
        `http://sound-data.local/api/songs/${userSongs[key].songId}`
      )

      if (responseSong.ok) {
        const responseSongData = await responseSong.json()
        responseSongs.push(responseSongData)
      } else {
        await songService.deleteSong({ songId: userSongs[key].songId })
      }
    }

    if (userSongs) {
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

module.exports = getSongsController
