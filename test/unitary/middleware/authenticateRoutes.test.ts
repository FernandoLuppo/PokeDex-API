import {
  loginValidationSchema,
  registerValidationSchema,
  newInfosValidationSchema,
  pokemonIdValidationSchema,
  emailRecoverPasswordValidationSchema,
  recoverPasswordValidationSchema
} from "../../../src/middleware/authenticate/validationSchema/validationSchema"
import { Authenticate } from "../../../src/middleware"
import { mockReq } from "../mock"
import { response } from "express"

describe("Authenticate.ts", () => {
  describe("login", () => {
    it("Should be able to cross the log authentication method normally", async () => {
      const req = mockReq(null)
      const res = response
      const next = jest.fn()

      jest.spyOn(loginValidationSchema, "validate").mockResolvedValue({} as any)

      const authenticate = new Authenticate()
      await authenticate.login(req, res, next)

      expect(next).toHaveBeenCalled()
    })
  })

  describe("register", () => {
    it("Should be able to cross the register authentication method normally", async () => {
      const req = mockReq(null)
      const res = response
      const next = jest.fn()

      jest
        .spyOn(registerValidationSchema, "validate")
        .mockResolvedValue({} as any)

      const authenticate = new Authenticate()
      await authenticate.register(req, res, next)

      expect(next).toHaveBeenCalled()
    })
  })

  describe("newUserInfos", () => {
    it("Should be able to cross the newUserInfos authentication method normally", async () => {
      const req = mockReq(null)
      const res = response
      const next = jest.fn()

      jest
        .spyOn(newInfosValidationSchema, "validate")
        .mockResolvedValue({} as any)

      const authenticate = new Authenticate()
      await authenticate.newUserInfos(req, res, next)

      expect(next).toHaveBeenCalled()
    })
  })

  describe("pokemonId", () => {
    it("Should be able to cross the pokemonId authentication method normally", async () => {
      const req = mockReq(null)
      req.body = { id: 1 }
      const res = response
      const next = jest.fn()

      jest
        .spyOn(pokemonIdValidationSchema, "validate")
        .mockResolvedValue({} as any)

      const authenticate = new Authenticate()
      await authenticate.pokemonId(req, res, next)

      expect(next).toHaveBeenCalled()
    })
  })

  describe("emailRecoverPassword", () => {
    it("Should be able to cross the emailRecoverPassword authentication method normally", async () => {
      const req = mockReq(null)
      const res = response
      const next = jest.fn()

      jest
        .spyOn(emailRecoverPasswordValidationSchema, "validate")
        .mockResolvedValue({} as any)

      const authenticate = new Authenticate()
      await authenticate.emailRecoverPassword(req, res, next)

      expect(next).toHaveBeenCalled()
    })
  })

  describe("recoverPassword", () => {
    it("Should be able to cross the recoverPassword authentication method normally", async () => {
      const req = mockReq(null)
      const res = response
      const next = jest.fn()

      jest
        .spyOn(recoverPasswordValidationSchema, "validate")
        .mockResolvedValue({} as any)

      const authenticate = new Authenticate()
      await authenticate.newUserInfos(req, res, next)

      expect(next).toHaveBeenCalled()
    })
  })
})
