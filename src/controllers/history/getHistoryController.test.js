/* eslint-disable no-undef */
const getHistoryController = require("./getHistoryController")
const historyService = require("#services/database/historyService")
const userService = require("#services/database/userService")
const api = require("#services/api/soundDataSongsService")

jest.mock("#services/database/historyService")
jest.mock("#services/database/userService")
jest.mock("#services/api/soundDataSongsService")
jest.mock("#config/logger")

describe("getHistoryController", () => {
  let mockReq
  let mockRes

  beforeEach(() => {
    mockReq = {
      params: {
        userId: "10",
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

  it("should return 200 with user's history data", async () => {
    const userHistory = [{ songId: 1 }]
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
    historyService.getSongsByUserId.mockResolvedValue(userHistory)
    api.getSongById.mockResolvedValue({ ok: true, status: 200, responseBody })

    await getHistoryController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(200)
    expect(mockRes.json).toHaveBeenCalledWith({ data: [responseBody.data] })
  })

  it("should return 400 if userId is not a number", async () => {
    mockReq.params.userId = "abc"

    await getHistoryController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(400)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 400, message: "Bad Request" }],
    })
  })

  it("should return 404 if user does not exist", async () => {
    userService.getUserById.mockResolvedValue(false)

    await getHistoryController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(404)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 404, message: "Not Found" }],
    })
  })

  it("should return 500 if external API returns 500", async () => {
    const userHistory = [{ songId: 1 }]
    userService.getUserById.mockResolvedValue(true)
    historyService.getSongsByUserId.mockResolvedValue(userHistory)
    api.getSongById.mockResolvedValue({ ok: false, status: 500 })

    await getHistoryController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(500)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 500, message: "Server error" }],
    })
  })

  it("should return 404 and delete song from history if song not found in external API", async () => {
    const userHistory = [{ songId: 1 }]
    userService.getUserById.mockResolvedValue(true)
    historyService.getSongsByUserId.mockResolvedValue(userHistory)
    api.getSongById.mockResolvedValue({ ok: false, status: 404 })

    await getHistoryController(mockReq, mockRes)

    expect(historyService.deleteSong).toHaveBeenCalledWith({ songId: 1 })
    expect(mockRes.status).toHaveBeenCalledWith(200)
    expect(mockRes.json).toHaveBeenCalledWith({ data: [] })
  })

  it("should return 500 if an error occurs", async () => {
    userService.getUserById.mockRejectedValue(new Error("Test error"))

    await getHistoryController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(500)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 500, message: "Server Error" }],
    })
  })
})
