import supertest from "supertest"
import { mockReq, mockReqError } from "../unitary/mock"
import { app } from "../../src/app"
import { mockTokens } from "./mocks"

describe("userRouter.ts", () => {
  describe("register", () => {
    it("Should register user and return a response", async () => {
      const req = mockReq(null)

      const response = await supertest(app)
        .post("/user/register")
        .send(req.body)

      expect(response.status).toEqual(201)
      expect(response.body).toEqual({
        message: "User registered with success",
        isError: false,
        error: ""
      })
    })

    it("Should return a error when try register a user", async () => {
      const req = mockReqError()

      const response = await supertest(app)
        .post("/user/register")
        .send(req.body)

      expect(response.status).toEqual(401)
      expect(response.body.isError).toBe(true)
      expect(response.body.error).toBeDefined()
      expect(response.body.error.length).toBeGreaterThan(0)
    })

    describe("login", () => {
      it("Should do the login and return a response", async () => {
        const req = mockReq(null)

        await supertest(app).post("/user/register").send(req.body)

        const response = await supertest(app).post("/user/login").send(req.body)

        expect(response.status).toEqual(200)
        expect(response.body).toEqual({
          message: "User logged with success",
          isError: false,
          error: ""
        })
      })

      it("Should return a error when user try log", async () => {
        const req = mockReq(null)

        const response = await supertest(app).post("/user/login").send(req.body)

        expect(response.status).toEqual(401)
        expect(response.body.isError).toBe(true)
        expect(response.body.error).toBeDefined()
        expect(response.body.error.length).toBeGreaterThan(0)
      })
    })

    describe("logout", () => {
      it("Should do the logout without errors", async () => {
        const response = await supertest(app).get("/user/logout").send()

        expect(response.status).toEqual(200)
        expect(response.body).toEqual({
          message: "Exited with success",
          isError: false,
          error: ""
        })
      })
    })

    describe("infos", () => {
      it("Should load user information", async () => {
        const req = mockReq(null)
        await supertest(app).post("/user/register").send(req.body)
        await supertest(app).post("/user/login").send(req.body)

        const { cookiesAccessTokenValidValue, cookiesRefreshTokenValidValue } =
          await mockTokens()

        const response = await supertest(app)
          .get("/user/infos")
          .send(req.body)
          .set(
            "Cookie",
            `${cookiesAccessTokenValidValue}; ${cookiesRefreshTokenValidValue}`
          )

        expect(response.body.data).toBeDefined()
        expect(response.body.data).toHaveProperty("name")
        expect(response.body.data).toHaveProperty("email")
        expect(response.body.isError).toBe(false)
      })

      it("Should return a error when try load user information", async () => {
        const req = mockReq(null)
        await supertest(app).post("/user/register").send(req.body)
        await supertest(app).post("/user/login").send(req.body)

        const response = await supertest(app).get("/user/infos").send(req.body)

        expect(response.status).toEqual(401)
        expect(response.body.isError).toBe(true)
        expect(response.body.error).toBe("jwt must be provided")
      })
    })

    describe("new-infos", () => {
      it("Should be able to update user information", async () => {
        const req = mockReq(null)
        await supertest(app).post("/user/register").send(req.body)
        await supertest(app).post("/user/login").send(req.body)

        const { cookiesAccessTokenValidValue, cookiesRefreshTokenValidValue } =
          await mockTokens()

        const response = await supertest(app)
          .put("/user/new-infos")
          .send(req.body)
          .set(
            "Cookie",
            `${cookiesAccessTokenValidValue}; ${cookiesRefreshTokenValidValue}`
          )

        expect(response.body.message).toBe("User information has been updated")
        expect(response.body.data).toBeDefined()
        expect(response.body.data).toHaveProperty("name")
        expect(response.body.data).toHaveProperty("email")
        expect(response.body.isError).toBe(false)
      })

      it("Should return a error when try update user information", async () => {
        const req = mockReq(null)
        await supertest(app).post("/user/register").send(req.body)
        await supertest(app).post("/user/login").send(req.body)

        const { cookiesAccessTokenValidValue, cookiesRefreshTokenValidValue } =
          await mockTokens()

        const reqError = mockReqError()
        const response = await supertest(app)
          .put("/user/new-infos")
          .send(reqError.body)
          .set(
            "Cookie",
            `${cookiesAccessTokenValidValue}; ${cookiesRefreshTokenValidValue}`
          )

        expect(response.status).toEqual(401)
        expect(response.body.isError).toBe(true)
        expect(response.body.error).toBeDefined()
        expect(response.body.error.length).toBeGreaterThan(0)
      })
    })
  })
})
