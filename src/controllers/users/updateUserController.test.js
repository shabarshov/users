/* eslint-disable no-undef */
const updateUserController = require("./updateUserController")
const userService = require("#services/database/userService")
const { nodeLogger } = require("#config/logger")

jest.mock("#services/database/userService")
jest.mock("#config/logger")

describe("updateUserController", () => {
  let mockReq
  let mockRes

  beforeEach(() => {
    mockReq = {
      params: { userId: 123 },
      body: { username: "new_username", password: "new_password" },
    }
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }
  })

  it("should return 200 with updated user data", async () => {
    const updatedUser = {
      id: 123,
      username: "new_username",
      password: "new_password",
    }
    userService.getUserByUsername.mockResolvedValue(null)
    userService.updateUserById.mockResolvedValue(updatedUser)

    await updateUserController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(200)
    expect(mockRes.json).toHaveBeenCalledWith({ data: updatedUser })
  })

  it("should return 200 with updated user data when only username is provided", async () => {
    const updatedUser = {
      id: 123,
      username: "new_username",
      password: "old_password",
    }
    userService.getUserByUsername.mockResolvedValue(null)
    userService.updateUserById.mockResolvedValue(updatedUser)

    mockReq.body = { username: "new_username" }

    await updateUserController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(200)
    expect(mockRes.json).toHaveBeenCalledWith({ data: updatedUser })
  })

  it("should return 200 with updated user data when only password is provided", async () => {
    const updatedUser = {
      id: 123,
      username: "old_username",
      password: "new_password",
    }
    userService.getUserByUsername.mockResolvedValue(null)
    userService.updateUserById.mockResolvedValue(updatedUser)

    mockReq.body = { password: "new_password" }

    await updateUserController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(200)
    expect(mockRes.json).toHaveBeenCalledWith({ data: updatedUser })
  })

  it("should return 400 if request body is empty", async () => {
    mockReq.body = {}

    await updateUserController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(400)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 400, message: "Bad Request" }],
    })
  })

  it("should return 400 if request body contains other fields", async () => {
    mockReq.body.other = "123"

    await updateUserController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(400)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 400, message: "Bad Request" }],
    })
  })

  it("should return 400 if username is already in use", async () => {
    userService.getUserByUsername.mockResolvedValue({ id: 456 })

    await updateUserController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(400)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [
        {
          code: 400,
          message: "Bad Request",
          meta: { additional_info: "Username already in use" },
        },
      ],
    })
  })

  it("should return 404 if user is not found", async () => {
    userService.getUserByUsername.mockResolvedValue(null)
    userService.updateUserById.mockResolvedValue(null)

    await updateUserController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(404)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 404, message: "User with that id not found" }],
    })
  })

  it("should return 500 if an error occurs", async () => {
    const error = new Error("Database error")
    userService.updateUserById.mockRejectedValue(error)

    await updateUserController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(500)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 500, message: "Server Error" }],
    })
    expect(nodeLogger.error).toHaveBeenCalledWith(error)
  })
})
