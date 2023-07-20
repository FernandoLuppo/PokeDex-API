import { Token } from "../../../src/service"
import { mockReqAccessToken, mockReqRefreshToken } from "../mock"
import { TokenAuthenticate } from "../../../src/middleware"
import * as dotenv from "dotenv"
import { response } from "express"
dotenv.config()
describe("tokenAuthenticate.ts", () => {
  describe("accessTokenAuthenticate", () => {
    it("Should call the next() without errors", async () => {
      const id = "12345"
      const token = new Token()
      const accessTokenValue = token.createAccessToken(id)

      const { accessToken } = accessTokenValue as {
        accessToken: string
      }
      const req = mockReqAccessToken(accessToken)

      const res = response
      const next = jest.fn()

      const authenticate = new TokenAuthenticate()
      await authenticate.accessTokenAuthenticate(req, res, next)

      expect(next).toHaveBeenCalled()
    })
  })

  describe("refreshTokenAuthenticate", () => {
    it("Should call the next() without errors", async () => {
      const id = "12345"
      const token = new Token()
      const refreshTokenValue = token.createRefreshToken(id)

      const { refreshToken } = refreshTokenValue as {
        refreshToken: string
      }
      const req = mockReqRefreshToken(refreshToken)

      const res = response
      const next = jest.fn()

      const authenticate = new TokenAuthenticate()
      await authenticate.refreshTokenAuthenticate(req, res, next)

      expect(next).toHaveBeenCalled()
    })
  })
})
