const songService = require("#services/songService")
const userService = require("#services/userService")

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
    if (userSongs) {
      return res.status(200).json({
        data: [
          ...userSongs.map((song) => {
            return {
              id: song.id,
              songId: song.songId,
              userId: song.userId,
            }
          }),
        ],
      })
    }
  } catch (e) {
    console.log(e)
    return res.status(500).json({
      errors: [{ code: 500, message: "Server Error" }],
    })
  }
}

module.exports = getSongsController
