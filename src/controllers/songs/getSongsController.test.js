/* eslint-disable no-undef */
const getSongsController = require("./getSongsController")
const songService = require("#services/database/songService")
const userService = require("#services/database/userService")
const api = require("#services/api/soundDataSongsService")

jest.mock("#services/database/songService")
jest.mock("#services/database/userService")
jest.mock("#services/api/soundDataSongsService")
jest.mock("#config/logger")

describe("getSongsController", () => {
  let mockReq
  let mockRes

  beforeEach(() => {
    mockReq = {
      params: {
        userId: 10,
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

  it("should return 200 and list of songs successfully", async () => {
    const userSongs = [{ songId: 10 }]
    const apiResponse = {
      ok: true,
      status: 200,
      responseBody: {
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
          audio: "https://vk.com/audio-2001955681_110955681",
        },
      },
    }

    userService.getUserById.mockResolvedValue(true)
    songService.getSongsByUserId.mockResolvedValue(userSongs)
    api.getSongById.mockResolvedValue(apiResponse)

    await getSongsController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(200)
    expect(mockRes.json).toHaveBeenCalledWith({
      data: [apiResponse.responseBody.data],
    })
  })

  it("should return 400 if userId is not a number", async () => {
    mockReq.params.userId = "abc"

    await getSongsController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(400)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 400, message: "Bad Request" }],
    })
  })

  it("should return 404 if user is not found", async () => {
    userService.getUserById.mockResolvedValue(false)

    await getSongsController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(404)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 404, message: "Not Found" }],
    })
  })

  it("should return 500 if an error occurs in API call", async () => {
    const userSongs = [{ songId: 10 }]
    userService.getUserById.mockResolvedValue(true)
    songService.getSongsByUserId.mockResolvedValue(userSongs)
    api.getSongById.mockResolvedValue({
      ok: false,
      status: 500,
    })

    await getSongsController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(500)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 500, message: "Server error" }],
    })
  })

  it("should return 500 if an exception occurs", async () => {
    userService.getUserById.mockRejectedValue(new Error("Test error"))

    await getSongsController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(500)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 500, message: "Server Error" }],
    })
  })
})
