/* eslint-disable no-undef */
const deleteAlbumController = require("./deleteAlbumController")
const albumService = require("#services/database/albumService")
const { nodeLogger } = require("#config/logger")

jest.mock("#services/database/albumService")
jest.mock("#config/logger")

describe("deleteAlbumController", () => {
  let mockReq
  let mockRes

  beforeEach(() => {
    mockReq = {
      params: { albumId: 123 },
      query: { user_id: 456 },
    }
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("should return 200 with empty data when album is successfully deleted", async () => {
    albumService.deleteAlbum.mockResolvedValue(true)

    await deleteAlbumController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(200)
    expect(mockRes.json).toHaveBeenCalledWith({ data: {} })
  })

  it("should return 400 if userId is not a number", async () => {
    mockReq.query.user_id = "xyz" // Invalid userId

    await deleteAlbumController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(400)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 400, message: "Bad Request" }],
    })
  })

  it("should return 400 if albumId is not a number", async () => {
    mockReq.params.albumId = "abc" // Invalid albumId

    await deleteAlbumController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(400)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 400, message: "Bad Request" }],
    })
  })

  it("should return 400 if userId is empty", async () => {
    delete mockReq.query.user_id

    await deleteAlbumController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(400)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 400, message: "Bad Request" }],
    })
  })

  it("should return 404 if album is not found", async () => {
    albumService.deleteAlbum.mockResolvedValue(false)

    await deleteAlbumController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(404)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 404, message: "Not Found" }],
    })
  })

  it("should return 500 if an error occurs during deletion", async () => {
    const error = new Error("Test error")
    albumService.deleteAlbum.mockRejectedValue(error)

    await deleteAlbumController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(500)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 500, message: "Server Error" }],
    })
    expect(nodeLogger.error).toHaveBeenCalledWith(error)
  })
})
