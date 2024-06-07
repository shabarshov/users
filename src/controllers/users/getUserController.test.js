/* eslint-disable no-undef */
const getUserController = require("./getUserController")
const userService = require("#services/database/userService")
const { nodeLogger } = require("#config/logger")

jest.mock("#services/database/userService")
jest.mock("#config/logger")

describe("getUserController", () => {
  let mockReq
  let mockRes

  beforeEach(() => {
    mockReq = {
      params: { userId: 123 },
    }
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }
  })

  it("should return 200 with user data if user is found", async () => {
    const user = { id: 123, username: "username", password: "password" }
    userService.getUserById.mockResolvedValue(user)

    await getUserController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(200)
    expect(mockRes.json).toHaveBeenCalledWith({ data: user })
  })

  it("should return 404 if user is not found", async () => {
    userService.getUserById.mockResolvedValue(null)

    await getUserController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(404)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 404, message: "Not Found" }],
    })
  })

  it("should return 400 if userId is not a number", async () => {
    mockReq.params.userId = "abc"

    await getUserController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(400)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 400, message: "Bad Request" }],
    })
  })

  it("should return 500 if an error occurs", async () => {
    const error = new Error("Database error")
    userService.getUserById.mockRejectedValue(error)

    await getUserController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(500)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 500, message: "Server Error" }],
    })
    expect(nodeLogger.error).toHaveBeenCalledWith(error)
  })
})
