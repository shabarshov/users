const userService = require("#services/userService")
const objectValidator = require("#utils/objectValidator")
const { requestBodyKeys } = require("#constants")
const { nodeLogger } = require("#config/logger")

const updateUserController = async (req, res) => {
  try {
    const userId = req.params.userId
    const newUserData = req.body

    if (
      objectValidator.isEmpty(newUserData) ||
      !objectValidator.hasOnlyAllowedKeys(
        newUserData,
        requestBodyKeys.users.patch.allowedKeys
      ) ||
      objectValidator.hasEmptyValues(newUserData) ||
      isNaN(userId)
    ) {
      return res.status(400).json({
        errors: [{ code: 400, message: "Bad Request" }],
      })
    }

    const updatedUser = await userService.updateUserById(userId, newUserData)

    if (!updatedUser) {
      return res.status(404).json({
        errors: [{ code: 404, message: "User with that id not found" }],
      })
    }

    return res.status(200).json({
      data: {
        username: updatedUser.username,
        password: updatedUser.password,
        id: updatedUser.id,
      },
    })
  } catch (e) {
    nodeLogger.error(e)
    return res.status(500).json({
      errors: [{ code: 500, message: "Server Error" }],
    })
  }
}

module.exports = updateUserController
