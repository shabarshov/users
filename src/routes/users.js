const express = require("express")
const router = express.Router()

const createUserController = require("#controllers/users/createUserController")
const deleteUserController = require("#controllers/users/deleteUserController")
const updateUserController = require("#controllers/users/updateUserController")
const getUserController = require("#controllers/users/getUserController")
const getAllUsersController = require("#controllers/users/getAllUsersController")

router.post("/", createUserController)
router.delete("/:userId", deleteUserController)
router.patch("/:userId", updateUserController)
router.get("/:userId", getUserController)
router.get("/", getAllUsersController)

module.exports = router
