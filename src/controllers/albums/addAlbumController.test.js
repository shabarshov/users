/* eslint-disable no-undef */
const addAlbumController = require("./addAlbumController")
const albumService = require("#services/database/albumService")
const userService = require("#services/database/userService")
const api = require("#services/api/soundDataAlbumsService")
const { nodeLogger } = require("#config/logger")

jest.mock("#services/database/albumService")
jest.mock("#services/database/userService")
jest.mock("#services/api/soundDataAlbumsService")
jest.mock("#config/logger")

describe("addAlbumController", () => {
  let mockReq
  let mockRes

  beforeEach(() => {
    mockReq = {
      body: {
        user_id: 123,
        album_id: 123,
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

  it("should return 200 with added album data", async () => {
    const responseBody = {
      data: {
        id: 10,
        name: "Star",
        img: "https://inlnk.ru/MjzLZx",
        songs: [
          {
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
        ],
      },
    }
    api.getAlbumById.mockResolvedValue({ ok: true, status: 200, responseBody })
    albumService.getAlbum.mockResolvedValue(null)
    albumService.addAlbum.mockResolvedValue(responseBody.data)
    userService.getUserById.mockResolvedValue({
      id: 1,
      username: "username",
      password: "password",
    })

    await addAlbumController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(200)
    expect(mockRes.json).toHaveBeenCalledWith(responseBody)
  })

  it("should return 400 if request body is empty", async () => {
    mockReq.body = {} // Пустое тело запроса

    await addAlbumController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(400)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 400, message: "Bad Request" }],
    })
  })

  it("should return 404 if user does not exist", async () => {
    userService.getUserById.mockResolvedValue(null)

    await addAlbumController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(404)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 404, message: "That user not found" }],
    })
  })

  it("should return 403 if album already exists", async () => {
    userService.getUserById.mockResolvedValue({})
    albumService.getAlbum.mockResolvedValue({}) // Уже добавленный альбом

    await addAlbumController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(403)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 403, message: "That album already exists" }],
    })
  })

  it("should return correct error response if API request fails with 500 status code", async () => {
    const status = 500
    const errorResponse = {
      errors: [{ code: 500, message: "Server error" }],
    }

    api.getAlbumById.mockResolvedValue({ ok: false, status: status })
    albumService.getAlbum.mockResolvedValue(null)
    userService.getUserById.mockResolvedValue({
      id: 1,
      username: "username",
      password: "password",
    })

    await addAlbumController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(status)
    expect(mockRes.json).toHaveBeenCalledWith(errorResponse)
  })

  it("should return correct error response if API request fails with 404 status code", async () => {
    const status = 404
    const errorResponse = {
      errors: [{ code: 404, message: "Not found" }],
    }

    api.getAlbumById.mockResolvedValue({ ok: false, status: status })
    albumService.getAlbum.mockResolvedValue(null)
    userService.getUserById.mockResolvedValue({
      id: 1,
      username: "username",
      password: "password",
    })

    await addAlbumController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(status)
    expect(mockRes.json).toHaveBeenCalledWith(errorResponse)
  })

  it("should return 500 if an error occurs", async () => {
    const error = new Error("Test error")
    api.getAlbumById.mockRejectedValue(error)

    await addAlbumController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(500)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 500, message: "Server Error" }],
    })
    expect(nodeLogger.error).toHaveBeenCalledWith(error)
  })
})
