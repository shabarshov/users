const { apiUrl } = require("#constants")

const getAlbumById = async (albumId) => {
  const response = await fetch(`${apiUrl}/album/${albumId}`)
  const { ok, status } = response
  const responseBody = ok ? await response.json() : null

  return { ok, status, responseBody }
}

module.exports = {
  getAlbumById,
}
