const User = require("#models/User")

const createUser = async (userData) => {
  const newUser = new User(userData)
  return await newUser.save()
}

const getUserByUsername = async (username) => {
  return await User.findOne({ where: { username: username } })
}

const deleteUserById = async (userId) => {
  return await User.destroy({ where: { id: userId } })
}

const updateUserById = async (userId, newData) => {
  const user = await User.findByPk(userId)

  if (!user) {
    return null
  }

  await user.update(newData)

  return user
}

module.exports = {
  createUser,
  getUserByUsername,
  deleteUserById,
  updateUserById,
}
