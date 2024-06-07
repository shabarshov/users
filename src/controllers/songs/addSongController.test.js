/* eslint-disable no-undef */
const addSongController = require("./addSongController")
const songService = require("#services/database/songService")
const userService = require("#services/database/userService")
const api = require("#services/api/soundDataSongsService")

jest.mock("#services/database/songService")
jest.mock("#services/database/userService")
jest.mock("#services/api/soundDataSongsService")
jest.mock("#config/logger")

describe("addSongController", () => {
  let mockReq
  let mockRes

  beforeEach(() => {
    mockReq = {
      body: {
        user_id: 10,
        song_id: 10,
      },
    }
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("should return 200 and add a song successfully", async () => {
    const responseBody = {
      data: {
        id: 10,
        album_id: 87362,
        author: {
          id: 10,
          name: "Savin Denis",
        },
        genre: {
          id: 10,
          name: "pop",
        },
        name: "Bismark",
        audio: "https://inlnk.ru/yOJAVK",
        img: "https://inlnk.ru/MjzLZx",
      },
    }

    userService.getUserById.mockResolvedValue(true)
    songService.getSong.mockResolvedValue(null)
    api.getSongById.mockResolvedValue({ ok: true, status: 200, responseBody })
    songService.addSong.mockResolvedValue(true)

    await addSongController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(200)
    expect(mockRes.json).toHaveBeenCalledWith(responseBody)
  })

  it("should return 400 if request body is empty", async () => {
    mockReq.body = {}

    await addSongController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(400)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 400, message: "Bad Request" }],
    })
  })

  it("should return 400 if request body with only user_id", async () => {
    delete mockReq.body.song_id

    await addSongController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(400)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 400, message: "Bad Request" }],
    })
  })

  it("should return 400 if request body with only song_id", async () => {
    delete mockReq.body.user_id

    await addSongController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(400)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 400, message: "Bad Request" }],
    })
  })

  it("should return 404 if user does not exist", async () => {
    userService.getUserById.mockResolvedValue(false)

    await addSongController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(404)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 404, message: "That user not found" }],
    })
  })

  it("should return 403 if song already exists", async () => {
    userService.getUserById.mockResolvedValue(true)
    songService.getSong.mockResolvedValue(true)

    await addSongController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(403)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 403, message: "That song already exists" }],
    })
  })

  it("should return the appropriate error if external API returns 404 status", async () => {
    userService.getUserById.mockResolvedValue(true)
    songService.getSong.mockResolvedValue(null)
    api.getSongById.mockResolvedValue({ ok: false, status: 404 })

    await addSongController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(404)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 404, message: "Not found" }],
    })
  })

  it("should return the appropriate error if external API returns 500 status", async () => {
    userService.getUserById.mockResolvedValue(true)
    songService.getSong.mockResolvedValue(null)
    api.getSongById.mockResolvedValue({ ok: false, status: 500 })

    await addSongController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(500)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 500, message: "Server error" }],
    })
  })

  it("should return 500 if an error occurs", async () => {
    userService.getUserById.mockRejectedValue(new Error("Test error"))

    await addSongController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(500)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 500, message: "Server Error" }],
    })
  })
})
