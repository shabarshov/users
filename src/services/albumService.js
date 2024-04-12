const Album = require("#models/Album")

const addAlbum = async (albumData) => {
  return await Album.create({
    userId: albumData.user_id,
    albumId: albumData.album_id,
  })
}

const getAlbum = async (albumData) => {
  return await Album.findOne({
    where: { userId: albumData.user_id, albumId: albumData.album_id },
  })
}

const getAlbumsByUserId = async (userId) => {
  return await Album.findAll({
    where: { userId: userId },
  })
}

const deleteAlbum = async (data) => {
  return await Album.destroy({ where: { ...data } })
}

module.exports = {
  addAlbum,
  getAlbum,
  getAlbumsByUserId,
  deleteAlbum,
}
