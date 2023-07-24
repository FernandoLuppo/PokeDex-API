import { Token } from "../../../../src/service"
import * as dotenv from "dotenv"
dotenv.config()

describe("Token.ts", () => {
  describe("createAccessToken", () => {
    it("Should create a access token correctly", () => {
      const id = "123456789"

      const token = new Token()
      const result = token.createAccessToken(id)

      expect(result).toBeDefined()
      expect(result).toHaveProperty("accessToken")
    })

    it("Should return a error when try generate the access token", () => {
      const originalEnv = process.env
      process.env = { ...originalEnv, ACCESS_TOKEN: undefined }

      const id = "123456789"

      const token = new Token()
      const result = token.createAccessToken(id)

      expect(result).toEqual({
        error: "Error when trying to generate the access token",
        isError: true,
        message: ""
      })

      process.env = originalEnv
    })
  })

  describe("createRefreshToken", () => {
    it("Should create a refresh token correctly", () => {
      const id = "123456789"

      const token = new Token()
      const result = token.createRefreshToken(id)

      expect(result).toBeDefined()
      expect(result).toHaveProperty("refreshToken")
      expect(result).toHaveProperty("refreshTokenExpiresDate")
    })

    it("Should return a error when try generate the refresh token", () => {
      const originalEnv = process.env
      process.env = { ...originalEnv, REFRESH_TOKEN: undefined }

      const id = "123456789"

      const token = new Token()
      const result = token.createRefreshToken(id)

      expect(result).toEqual({
        error: "Error when trying to generate refresh token",
        isError: true,
        message: ""
      })

      process.env = originalEnv
    })
  })
})
