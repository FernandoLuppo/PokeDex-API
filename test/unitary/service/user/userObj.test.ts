import {
  mockGetUserInfos,
  mockLogin,
  mockNewUserInfos,
  mockRegister,
  mockReq,
  mockReqError,
  mockUserID
} from "../../mock"
import * as dotenv from "dotenv"
dotenv.config()

describe("User.ts", () => {
  describe("register", () => {
    it("Should register a new user", async () => {
      const req = mockReq(null)
      const register = await mockRegister(req)

      expect(register.message).toBe("User registered with success")
      expect(register.isError).toBe(false)
    })

    it("Should return a error when try to register a new user", async () => {
      const req = mockReq(null)
      await mockRegister(req)
      const result = await mockRegister(req)

      expect(result.error).toBe("User already exist!")
      expect(result.isError).toBe(true)
    })
  })

  describe("login", () => {
    it("Should be able to do the login normally", async () => {
      const req = mockReq(null)
      await mockRegister(req)
      const login = await mockLogin(req)

      expect(login.message).toBe("User logged with success")
      expect(login.isError).toBe(false)
      expect(login.data).toBeDefined()
      expect(login.data).toHaveProperty("accessToken")
      expect(login.data).toHaveProperty("refreshToken")
    })

    it("Should return a error when try to do the login", async () => {
      const req = mockReqError()
      const login = await mockLogin(req)

      expect(login.error).toBe("Email or password incorrect")
      expect(login.isError).toBe(true)
    })
  })

  describe("getUserInfos", () => {
    it("Should be able to load user information", async () => {
      const req = mockReq(null)
      await mockRegister(req)
      const newReq = await mockUserID(req)

      const userInfos = await mockGetUserInfos(newReq)

      expect(userInfos.message).toBe("User information load with success")
      expect(userInfos.isError).toBe(false)
      expect(userInfos.data).toBeDefined()
      expect(userInfos.data).toHaveProperty("name")
      expect(userInfos.data).toHaveProperty("email")
    })

    it("Should return a error when try to load user information", async () => {
      const req = mockReqError()
      const userInfos = await mockGetUserInfos(req)

      expect(userInfos.error).toBe("User undefined")
      expect(userInfos.isError).toBe(true)
    })
  })

  describe("newUserInfos", () => {
    it("Should be able to update user information", async () => {
      const req = mockReq(null)
      await mockRegister(req)
      const newReq = await mockUserID(req)
      const userInfos = await mockNewUserInfos(newReq)

      expect(userInfos.message).toBe("User information has been updated")
      expect(userInfos.isError).toBe(false)
      expect(userInfos.data).toHaveProperty("name")
      expect(userInfos.data).toHaveProperty("email")
    })

    it("Should return a error when try to update user information", async () => {
      const req = mockReqError()
      const userInfos = await mockNewUserInfos(req)

      expect(userInfos.isError).toBe(true)
      expect(userInfos.error).toBeDefined()
      expect(userInfos.error).not.toBeNull()
      expect(userInfos.error.length).toBeGreaterThan(5)
    })
  })
})
