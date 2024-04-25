const User = require("#models/User")

const createUser = async (userData) => {
  return await User.create(userData)
}

const getUserByUsername = async (username) => {
  return await User.findOne({ where: { username: username } })
}

const getUserById = async (userId) => {
  return await User.findByPk(userId)
}

const deleteUserById = async (userId) => {
  return await User.destroy({ where: { id: userId } })
}

const updateUserById = async (userId, newData) => {
  const user = await User.findByPk(userId)

  if (!user) {
    return null
  }

  return await user.update(newData)
}

module.exports = {
  createUser,
  getUserByUsername,
  getUserById,
  deleteUserById,
  updateUserById,
}
