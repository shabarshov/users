/* eslint-disable no-undef */
const clearHistoryController = require("./clearHistoryController")
const historyService = require("#services/database/historyService")
const userService = require("#services/database/userService")

jest.mock("#services/database/historyService")
jest.mock("#services/database/userService")
jest.mock("#config/logger")

describe("clearHistoryController", () => {
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

  it("should return 200 when history is cleared successfully", async () => {
    userService.getUserById.mockResolvedValue(true)
    historyService.clearHistoryByUserId.mockResolvedValue(true)

    await clearHistoryController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(200)
    expect(mockRes.json).toHaveBeenCalledWith({ data: {} })
  })

  it("should return 400 if userId is not a number", async () => {
    mockReq.params.userId = "abc"

    await clearHistoryController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(400)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 400, message: "Bad Request" }],
    })
  })

  it("should return 404 if user does not exist", async () => {
    userService.getUserById.mockResolvedValue(false)

    await clearHistoryController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(404)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 404, message: "That user not found" }],
    })
  })

  it("should return 404 if no songs found to delete", async () => {
    userService.getUserById.mockResolvedValue(true)
    historyService.clearHistoryByUserId.mockResolvedValue(false)

    await clearHistoryController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(404)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 404, message: "Not Found" }],
    })
  })

  it("should return 500 if an error occurs", async () => {
    userService.getUserById.mockResolvedValue(true)
    historyService.clearHistoryByUserId.mockRejectedValue(
      new Error("Test error")
    )

    await clearHistoryController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(500)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 500, message: "Server Error" }],
    })
  })
})
