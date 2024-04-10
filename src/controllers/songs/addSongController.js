const songService = require("#services/songService")
const userService = require("#services/userService")
const requestBodyKeys = require("#constants")
const objectValidator = require("#utils/objectValidator")

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

    const existingSong = await songService.getSong(songData)

    if (existingSong) {
      return res.status(403).json({
        errors: [{ code: 403, message: "That song already exists" }],
      })
    }

    const newSong = await songService.addSong(songData)
    if (newSong) {
      return res.status(200).json({
        data: {
          id: newSong.id,
          song_id: newSong.songId,
          user_id: newSong.userId,
        },
      })
    }
  } catch (e) {
    console.log(e)
    return res.status(500).json({
      errors: [{ code: 500, message: "Server Error" }],
    })
  }
}

module.exports = addSongController
