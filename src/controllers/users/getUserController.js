const userService = require("#services/userService")
const { nodeLogger } = require("#config/logger")

const getUserController = async (req, res) => {
  try {
    const userId = req.params.userId

    if (isNaN(userId)) {
      return res.status(400).json({
        errors: [{ code: 400, message: "Bad Request" }],
      })
    }

    const user = await userService.getUserById(userId)
    if (!user) {
      return res.status(404).json({
        errors: [{ code: 404, message: "Not Found" }],
      })
    }

    return res.status(200).json({
      data: {
        id: user.id,
        username: user.username,
        password: user.password,
      },
    })
  } catch (e) {
    nodeLogger.error(e)
    return res.status(500).json({
      errors: [{ code: 500, message: "Server Error" }],
    })
  }
}

module.exports = getUserController
