const { apiUrl } = require("#constants")

const getPlaylistByUserId = async (userId) => {
  const response = await fetch(`${apiUrl}/playlists/user/${userId}`)
  const { ok, status } = response
  const responseBody = ok ? await response.json() : null

  return { ok, status, responseBody }
}

const deletePlaylistById = async (playlistId) => {
  const response = await fetch(`${apiUrl}/playlists/${playlistId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
  const { ok, status } = response
  const responseBody = ok ? await response.json() : null

  return { ok, status, responseBody }
}

module.exports = {
  getPlaylistByUserId,
  deletePlaylistById,
}
