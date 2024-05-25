/* eslint-disable no-undef */
const deleteSongController = require("./deleteSongController")
const songService = require("#services/database/songService")

jest.mock("#services/database/songService")
jest.mock("#config/logger")

describe("deleteSongController", () => {
  let mockReq
  let mockRes

  beforeEach(() => {
    mockReq = {
      params: {
        songId: 10,
      },
      query: {
        user_id: 10,
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

  it("should return 200 and delete a song successfully", async () => {
    songService.deleteSong.mockResolvedValue(true)

    await deleteSongController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(200)
    expect(mockRes.json).toHaveBeenCalledWith({ data: {} })
  })

  it("should return 400 if user_id and song_id is not a number", async () => {
    mockReq.params.songId = "abc"
    mockReq.query.user_id = "xyz"

    await deleteSongController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(400)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 400, message: "Bad Request" }],
    })
  })

  it("should return 400 if user_id is not a number", async () => {
    mockReq.query.user_id = "xyz"

    await deleteSongController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(400)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 400, message: "Bad Request" }],
    })
  })

  it("should return 400 if song_id is not a number", async () => {
    mockReq.params.songId = "abc"

    await deleteSongController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(400)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 400, message: "Bad Request" }],
    })
  })

  it("should return 400 if user_id doesn't exists", async () => {
    delete mockReq.query.user_id

    await deleteSongController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(400)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 400, message: "Bad Request" }],
    })
  })

  it("should return 404 if song to delete is not found", async () => {
    songService.deleteSong.mockResolvedValue(false)

    await deleteSongController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(404)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 404, message: "Not Found" }],
    })
  })

  it("should return 500 if an error occurs", async () => {
    songService.deleteSong.mockRejectedValue(new Error("Test error"))

    await deleteSongController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(500)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 500, message: "Server Error" }],
    })
  })
})
