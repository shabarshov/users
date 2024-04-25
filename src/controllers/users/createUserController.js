const userService = require("#services/database/userService")
const objectValidator = require("#utils/objectValidator")
const { requestBodyKeys } = require("#constants")
const { nodeLogger } = require("#config/logger")

const createUserController = async (req, res) => {
  try {
    const userData = req.body

    if (
      objectValidator.isEmpty(userData) ||
      !objectValidator.hasAllKeys(
        userData,
        requestBodyKeys.users.post.requiredKeys
      ) ||
      objectValidator.hasEmptyValues(userData)
    ) {
      return res.status(400).json({
        errors: [{ code: 400, message: "Bad Request" }],
      })
    }

    const existingUser = await userService.getUserByUsername(userData.username)
    if (existingUser) {
      return res.status(403).json({
        errors: [
          { code: 403, message: "User with that username already exists" },
        ],
      })
    }

    const newUser = await userService.createUser(userData)
    return res.status(200).json({
      data: {
        username: newUser.username,
        password: newUser.password,
        id: newUser.id,
      },
    })
  } catch (e) {
    nodeLogger.error(e)
    return res.status(500).json({
      errors: [{ code: 500, message: "Server Error" }],
    })
  }
}

module.exports = createUserController
