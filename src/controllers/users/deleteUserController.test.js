/* eslint-disable no-undef */
const deleteUserController = require("./deleteUserController")
const userService = require("#services/database/userService")
const api = require("#services/api/soundDataPlaylistsService")
const { nodeLogger } = require("#config/logger")

jest.mock("#services/database/userService")
jest.mock("#services/api/soundDataPlaylistsService")
jest.mock("#config/logger")

describe("deleteUserController", () => {
  let mockReq
  let mockRes

  beforeEach(() => {
    mockReq = {
      params: {},
    }
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }
  })

  it("should return 200 if user is deleted successfully and playlists are handled", async () => {
    mockReq.params.userId = 1

    userService.deleteUserById.mockResolvedValue(true)
    api.getPlaylistByUserId.mockResolvedValue({
      ok: true,
      responseBody: { data: [{ id: 1 }, { id: 2 }] },
    })
    api.deletePlaylistById.mockResolvedValue(true)

    await deleteUserController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(200)
    expect(mockRes.json).toHaveBeenCalledWith({ data: {} })
  })

  it("should return 400 if userId is not a number", async () => {
    mockReq.params.userId = "invalid"

    await deleteUserController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(400)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 400, message: "Bad Request" }],
    })
  })

  it("should return 404 if user is not found", async () => {
    mockReq.params.userId = 1

    userService.deleteUserById.mockResolvedValue(false)

    await deleteUserController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(404)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 404, message: "User with that id not found" }],
    })
  })

  it("should return 500 if an error occurs", async () => {
    mockReq.params.userId = 1

    userService.deleteUserById.mockRejectedValue(new Error("Database error"))

    await deleteUserController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(500)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 500, message: "Server Error" }],
    })
    expect(nodeLogger.error).toHaveBeenCalledWith(new Error("Database error"))
  })

  it("should continue if getPlaylistByUserId returns an error", async () => {
    mockReq.params.userId = 1

    userService.deleteUserById.mockResolvedValue(true)
    api.getPlaylistByUserId.mockResolvedValue({
      ok: false,
      responseBody: { data: [] },
    })

    await deleteUserController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(200)
    expect(mockRes.json).toHaveBeenCalledWith({ data: {} })
  })
})
