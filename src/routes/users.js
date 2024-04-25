const express = require("express")
const router = express.Router()

const createUserController = require("#controllers/users/createUserController")
const deleteUserController = require("#controllers/users/deleteUserController")
const updateUserController = require("#controllers/users/updateUserController")
const getUserController = require("#controllers/users/getUserController")

router.post("/", createUserController)
router.delete("/:userId", deleteUserController)
router.patch("/:userId", updateUserController)
router.get("/:userId", getUserController)

module.exports = router
