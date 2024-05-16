const User = require("#models/User")
const { getDifferentFields } = require("#utils/getDifferentFields")

const createUser = async (userData) => {
  return await User.create(userData)
}

const getAllUsers = async () => {
  return await User.findAll()
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

  const extractedUser = {
    username: user.get("username"),
    password: user.get("password"),
  }

  const uniqueNewData = getDifferentFields(extractedUser, newData)

  return await user.update(uniqueNewData)
}

module.exports = {
  createUser,
  getAllUsers,
  getUserByUsername,
  getUserById,
  deleteUserById,
  updateUserById,
}
