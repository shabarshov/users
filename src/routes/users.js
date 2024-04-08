const express = require("express")
const router = express.Router()

const createUserController = require("../controllers/users/createUserController")
const deleteUserController = require("../controllers/users/deleteUserController")
const updateUserController = require("../controllers/users/updateUserController")

router.post("/", createUserController)
router.delete("/:userId", deleteUserController)
router.patch("/:userId", updateUserController)

module.exports = router
