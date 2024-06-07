/* eslint-disable no-undef */
const getAllUsersController = require("./getAllUsersController")
const userService = require("#services/database/userService")
const { nodeLogger } = require("#config/logger")

jest.mock("#services/database/userService")
jest.mock("#config/logger")

describe("getAllUsersController", () => {
  let mockReq
  let mockRes

  beforeEach(() => {
    mockReq = {}
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }
  })

  it("should return 200 with an empty array if no users are found", async () => {
    userService.getAllUsers.mockResolvedValue([])

    await getAllUsersController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(200)
    expect(mockRes.json).toHaveBeenCalledWith({ data: [] })
  })

  it("should return 200 with a single user if one user is found", async () => {
    const user = { id: 1, username: "username", password: "password" }
    userService.getAllUsers.mockResolvedValue([user])

    await getAllUsersController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(200)
    expect(mockRes.json).toHaveBeenCalledWith({ data: [user] })
  })

  it("should return 200 with multiple users if multiple users are found", async () => {
    const users = [
      { id: 1, username: "user1", password: "password1" },
      { id: 2, username: "user2", password: "password2" },
    ]
    userService.getAllUsers.mockResolvedValue(users)

    await getAllUsersController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(200)
    expect(mockRes.json).toHaveBeenCalledWith({ data: users })
  })

  it("should return 500 if an error occurs", async () => {
    const error = new Error("Database error")
    userService.getAllUsers.mockRejectedValue(error)

    await getAllUsersController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(500)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 500, message: "Server Error" }],
    })
    expect(nodeLogger.error).toHaveBeenCalledWith(error)
  })
})
