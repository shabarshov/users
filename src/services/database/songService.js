const Song = require("#models/Song")

const addSong = async (songData) => {
  return await Song.create({
    userId: songData.user_id,
    songId: songData.song_id,
  })
}

const getSong = async (songData) => {
  return await Song.findOne({
    where: { userId: songData.user_id, songId: songData.song_id },
  })
}

const getSongsByUserId = async (userId) => {
  return await Song.findAll({
    where: { userId: userId },
  })
}

const deleteSong = async (data) => {
  return await Song.destroy({ where: { ...data } })
}

module.exports = {
  addSong,
  getSong,
  getSongsByUserId,
  deleteSong,
}
