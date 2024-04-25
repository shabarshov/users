const { apiUrl } = require("#constants")

const getSongById = async (songId) => {
  const response = await fetch(`${apiUrl}/songs/${songId}`)
  const { ok, status } = response
  const responseBody = ok ? await response.json() : null

  return { ok, status, responseBody }
}

module.exports = {
  getSongById,
}
