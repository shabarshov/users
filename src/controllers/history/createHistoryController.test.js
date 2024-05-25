/* eslint-disable no-undef */
const createHistoryController = require("./createHistoryController")
const historyService = require("#services/database/historyService")
const userService = require("#services/database/userService")
const api = require("#services/api/soundDataSongsService")

jest.mock("#services/database/historyService")
jest.mock("#services/database/userService")
jest.mock("#services/api/soundDataSongsService")
jest.mock("#config/logger")

describe("createHistoryController", () => {
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

  it("should return 200 when song is added to history successfully", async () => {
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
    historyService.getSong.mockResolvedValue(false)
    api.getSongById.mockResolvedValue({ ok: true, responseBody })
    historyService.addSong.mockResolvedValue(true)

    await createHistoryController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(200)
    expect(mockRes.json).toHaveBeenCalledWith(responseBody)
  })

  it("should return 400 if request body is empty", async () => {
    mockReq.body = {}
    await createHistoryController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(400)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 400, message: "Bad Request" }],
    })
  })

  it("should return 400 if request body contains only user_id", async () => {
    delete mockReq.body.song_id
    await createHistoryController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(400)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 400, message: "Bad Request" }],
    })
  })

  it("should return 400 if request body contains only song_id", async () => {
    delete mockReq.body.user_id
    await createHistoryController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(400)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 400, message: "Bad Request" }],
    })
  })

  it("should return 400 if request body contains unrequired fields", async () => {
    mockReq.body.other = "123"
    await createHistoryController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(400)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 400, message: "Bad Request" }],
    })
  })

  it("should return 404 if user does not exist", async () => {
    userService.getUserById.mockResolvedValue(false)

    await createHistoryController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(404)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 404, message: "That user not found" }],
    })
  })

  it("should return 403 if song already exists in history", async () => {
    userService.getUserById.mockResolvedValue(true)
    historyService.getSong.mockResolvedValue(true)

    await createHistoryController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(403)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 403, message: "That song already exists" }],
    })
  })

  it("should return 404 if song not found", async () => {
    userService.getUserById.mockResolvedValue(true)
    historyService.getSong.mockResolvedValue(false)
    api.getSongById.mockResolvedValue({ ok: false, status: 404 })

    await createHistoryController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(404)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 404, message: "That song not found" }],
    })
  })

  it("should return 500 if an error occurs", async () => {
    userService.getUserById.mockResolvedValue(true)
    historyService.getSong.mockResolvedValue(false)
    api.getSongById.mockRejectedValue(new Error("Test error"))

    await createHistoryController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(500)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 500, message: "Server Error" }],
    })
  })
})
