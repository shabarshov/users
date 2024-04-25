const History = require("#models/History")
const { historyLimit } = require("#constants")

const addSong = async (songData) => {
  const count = await History.count({
    where: { userId: songData.user_id },
  })

  if (count === historyLimit) {
    const oldestSong = await History.findOne({
      where: { userId: songData.user_id },
      order: [["createdAt", "ASC"]],
    })

    await oldestSong.destroy()
  }

  return await History.create({
    userId: songData.user_id,
    songId: songData.song_id,
  })
}

const getSong = async (songData) => {
  return await History.findOne({
    where: { userId: songData.user_id, songId: songData.song_id },
  })
}

const getSongsByUserId = async (userId) => {
  return await History.findAll({
    where: { userId: userId },
  })
}

const clearHistoryByUserId = async (userId) => {
  return await History.destroy({ where: { userId: userId } })
}

module.exports = {
  addSong,
  getSong,
  getSongsByUserId,
  clearHistoryByUserId,
}
