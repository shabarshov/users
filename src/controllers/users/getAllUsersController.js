const userService = require("#services/database/userService")
const { nodeLogger } = require("#config/logger")

const getAllUsersController = async (req, res) => {
  try {
    const users = await userService.getAllUsers()

    return res.status(200).json({
      data: users.map((user) => {
        return {
          id: user.id,
          username: user.username,
          password: user.password,
        }
      }),
    })
  } catch (e) {
    nodeLogger.error(e)
    return res.status(500).json({
      errors: [{ code: 500, message: "Server Error" }],
    })
  }
}

module.exports = getAllUsersController
