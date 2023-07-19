import { model } from "mongoose"
import { Token, TokenUser } from "../../../../src/service"
import {
  mockLogin,
  mockRegister,
  mockReq,
  mockReqId,
  mockReqRefreshToken,
  mockUserID
} from "../../mock"
import * as dotenv from "dotenv"
dotenv.config()

describe("TokenUser.ts", () => {
  describe("loginAccessTokenValidation", () => {
    it("Should make login correctly and save the tokens to user", async () => {
      const id = await mockUserID()
      const req = mockReqId(id)

      const token = new Token()
      const tokenUser = new TokenUser(req, token)

      const result = await tokenUser.loginAccessTokenValidation(id)

      expect(result.data).toBeDefined()
      expect(result.data).toHaveProperty("accessToken")
      expect(result.data).toHaveProperty("refreshToken")
    })

    it("Should return a error when try to login can't save the tokens", async () => {
      const originalEnv = process.env
      process.env = { ...originalEnv, ACCESS_TOKEN: undefined }

      const id = await mockUserID()
      const req = mockReqId(id)

      const token = new Token()
      const tokenUser = new TokenUser(req, token)

      const result = await tokenUser.loginAccessTokenValidation(id)

      expect(result.isError).toBe(true)
      expect(result.error).toBe("Token Undefined")

      process.env = originalEnv
    })
  })
  describe("newTokens", () => {
    it("Should create new tokens when the original access token was expired", async () => {
      const req = mockReq()
      await mockRegister(req)
      await mockLogin(req)

      const RefreshToken = model("refreshTokens")
      const userRefreshToken = await RefreshToken.find()
      const refreshToken = userRefreshToken[0].refreshToken

      const reqRefreshToken = mockReqRefreshToken(refreshToken)
      const token = new Token()
      const tokenUser = new TokenUser(reqRefreshToken, token)
      const newTokens = await tokenUser.newTokens()

      expect(newTokens.message).toBe("New tokens create with success")
      expect(newTokens.isError).toBe(false)
      expect(newTokens.data).toBeDefined()
      expect(newTokens.data).toHaveProperty("accessToken")
      expect(newTokens.data).toHaveProperty("refreshToken")
    })

    it("Should create new tokens when the original access token was expired", async () => {
      const originalEnv = process.env
      process.env = { ...originalEnv, REFRESH_TOKEN: undefined }

      const req = mockReq()
      await mockRegister(req)
      await mockLogin(req)

      const RefreshToken = model("refreshTokens")
      const userRefreshToken = await RefreshToken.find()
      const refreshToken = userRefreshToken[0].refreshToken

      const reqRefreshToken = mockReqRefreshToken(refreshToken)
      const token = new Token()
      const tokenUser = new TokenUser(reqRefreshToken, token)
      const newTokens = await tokenUser.newTokens()

      expect(newTokens.error).toBe("Cookie is missing")
      expect(newTokens.isError).toBe(true)

      process.env = originalEnv
    })
  })
})
