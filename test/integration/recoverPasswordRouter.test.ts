import supertest from "supertest"
import { mockRegister, mockReq, mockReqError } from "../unitary/mock"
import { app } from "../../src/app"

describe("recoverPasswordRouter.ts", () => {
  describe("check-email", () => {
    it("Should send a email to user with a code", async () => {
      const req = mockReq(null)
      await mockRegister(req)

      const response = await supertest(app)
        .post("/recover-password/check-email")
        .send(req.body)

      expect(response.status).toBe(200)
      expect(response.body.data).toBeDefined()
      expect(response.body.data).toHaveProperty("email")
      expect(response.body.data).toHaveProperty("code")
      expect(response.body.isError).toBe(false)
    })

    it("Should return a error when user put the wrong email", async () => {
      const req = mockReqError()

      const response = await supertest(app)
        .post("/recover-password/check-email")
        .send(req.body)

      expect(response.status).toBe(401)
      expect(response.body.isError).toBe(true)
      expect(response.body.error).toBeDefined()
      expect(response.body.error.length).toBeGreaterThan(0)
    })
  })

  describe("new-password", () => {
    it("User should be able to update password", async () => {
      const req = mockReq(null)
      await mockRegister(req)

      const response = await supertest(app)
        .put("/recover-password/new-password")
        .send(req.body)

      expect(response.status).toBe(200)
      expect(response.body.message).toBe("Password successfully updated")
      expect(response.body.isError).toBe(false)
    })

    it("Should return a error when user try to update he's password", async () => {
      const req = mockReqError()

      const response = await supertest(app)
        .put("/recover-password/new-password")
        .send(req.body)

      expect(response.status).toBe(401)
      expect(response.body.isError).toBe(true)
      expect(response.body.error).toBeDefined()
      expect(response.body.error.length).toBeGreaterThan(0)
    })
  })
})
