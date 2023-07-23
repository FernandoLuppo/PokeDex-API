import supertest from "supertest"
import { mockReq } from "../unitary/mock"
import { app } from "../../src/app"
import { mockTokens } from "./mocks"

describe("tokenRouter.ts", () => {
  describe("new-token", () => {
    it("Should send new tokens if user have a valid refresh token", async () => {
      const req = mockReq(null)
      await supertest(app).post("/user/register").send(req.body)
      await supertest(app).post("/user/login").send(req.body)

      const { cookiesAccessTokenValidValue, cookiesRefreshTokenValidValue } =
        await mockTokens()

      const response = await supertest(app)
        .put("/token/new-token")
        .send(req.body)
        .set(
          "Cookie",
          `${cookiesAccessTokenValidValue}; ${cookiesRefreshTokenValidValue}`
        )

      expect(response.body.message).toBe("New tokens create with success")
      expect(response.body.isError).toBe(false)
    })

    it("Should return a error when user request a new token", async () => {
      const req = mockReq(null)

      const response = await supertest(app)
        .put("/token/new-token")
        .send(req.body)

      expect(response.body.error).toBe("jwt must be provided")
      expect(response.body.isError).toBe(true)
    })
  })
})
