const express = require("express")
const router = express.Router()

const addSongController = require("#controllers/songs/addSongController")
const deleteSongController = require("#controllers/songs/deleteSongController")
const getSongsController = require("#controllers/songs/getSongsController")

router.post("/", addSongController)
router.get("/:userId", getSongsController)
router.delete("/:songId", deleteSongController)

module.exports = router
