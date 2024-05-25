/* eslint-disable no-undef */
const getAlbumsController = require("./getAlbumsController")
const albumService = require("#services/database/albumService")
const userService = require("#services/database/userService")
const api = require("#services/api/soundDataAlbumsService")

jest.mock("#services/database/albumService")
jest.mock("#services/database/userService")
jest.mock("#services/api/soundDataAlbumsService")
jest.mock("#config/logger")

describe("getAlbumsController", () => {
  let mockReq
  let mockRes

  beforeEach(() => {
    mockReq = {
      params: {
        userId: 123,
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

  it("should return 200 with user's albums data", async () => {
    const userAlbums = [{ albumId: 1 }]
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
    userService.getUserById.mockResolvedValue(true)
    albumService.getAlbumsByUserId.mockResolvedValue(userAlbums)
    api.getAlbumById.mockResolvedValue({ ok: true, status: 200, responseBody })

    await getAlbumsController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(200)
    expect(mockRes.json).toHaveBeenCalledWith({
      data: [responseBody.data],
    })
  })

  it("should return 400 if userId is not a number", async () => {
    mockReq.params.userId = "abc"

    await getAlbumsController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(400)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 400, message: "Bad Request" }],
    })
  })

  it("should return 404 if user does not exist", async () => {
    userService.getUserById.mockResolvedValue(false)

    await getAlbumsController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(404)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 404, message: "Not Found" }],
    })
  })

  it("should return 500 if an error occurs while fetching albums", async () => {
    userService.getUserById.mockResolvedValue(true)
    albumService.getAlbumsByUserId.mockRejectedValue(new Error("Test error"))

    await getAlbumsController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(500)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 500, message: "Server Error" }],
    })
  })

  it("should return 500 if an error occurs while fetching album details", async () => {
    userService.getUserById.mockResolvedValue(true)
    albumService.getAlbumsByUserId.mockResolvedValue([{ albumId: 1 }])
    api.getAlbumById.mockRejectedValue(new Error("Test error"))

    await getAlbumsController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(500)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 500, message: "Server Error" }],
    })
  })

  it("should return 200 if all albums not found in sound-data service", async () => {
    userService.getUserById.mockResolvedValue(true)
    albumService.getAlbumsByUserId.mockResolvedValue([{ albumId: 1 }])
    api.getAlbumById.mockResolvedValue({ ok: false, status: 404 })

    await getAlbumsController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(200)
    expect(mockRes.json).toHaveBeenCalledWith({ data: [] })
  })
})
