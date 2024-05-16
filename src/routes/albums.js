const express = require("express")
const router = express.Router()

const addAlbumController = require("#controllers/albums/addAlbumController")
const getAlbumsController = require("#controllers/albums/getAlbumsController")
const deleteAlbumController = require("#controllers/albums/deleteAlbumController")

router.post("/", addAlbumController)
router.get("/:userId", getAlbumsController)
router.delete("/:albumId", deleteAlbumController)

module.exports = router
