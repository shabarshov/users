/* eslint-disable no-undef */
const createUserController = require("./createUserController")
const userService = require("#services/database/userService")
const { nodeLogger } = require("#config/logger")
jest.mock("#services/database/userService")
jest.mock("#config/logger")

describe("createUserController", () => {
  let mockReq
  let mockRes

  beforeEach(() => {
    mockReq = {
      body: { username: "username", password: "password" },
    }
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }
  })

  it("should return 200 if user is created successfully", async () => {
    userService.getUserByUsername.mockResolvedValue(null)
    userService.createUser.mockResolvedValue({
      id: 1,
      username: "username",
      password: "password",
    })

    await createUserController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(200)
    expect(mockRes.json).toHaveBeenCalledWith({
      data: {
        id: 1,
        username: "username",
        password: "password",
      },
    })
  })

  it("should return 400 if request body is empty", async () => {
    mockReq.body = {}

    await createUserController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(400)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 400, message: "Bad Request" }],
    })
  })

  it("should return 400 if request body contains only password", async () => {
    delete mockReq.body.username

    await createUserController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(400)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 400, message: "Bad Request" }],
    })
  })

  it("should return 400 if request body contains only username", async () => {
    delete mockReq.body.password

    await createUserController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(400)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 400, message: "Bad Request" }],
    })
  })

  it("should return 400 if request body contains other fields", async () => {
    mockReq.body.other = "123"

    await createUserController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(400)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 400, message: "Bad Request" }],
    })
  })

  it("should return 400 if request body is invalid", async () => {
    mockReq.body = {}

    await createUserController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(400)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 400, message: "Bad Request" }],
    })
  })

  it("should return 403 if username already exists", async () => {
    userService.getUserByUsername.mockResolvedValue({ ...mockReq.body, id: 1 })

    await createUserController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(403)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [
        { code: 403, message: "User with that username already exists" },
      ],
    })
  })

  it("should return 500 if an error occurs", async () => {
    userService.getUserByUsername.mockRejectedValue(new Error("Database error"))

    await createUserController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(500)
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ code: 500, message: "Server Error" }],
    })
    expect(nodeLogger.error).toHaveBeenCalledWith(new Error("Database error"))
  })
})
