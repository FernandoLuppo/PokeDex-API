import { IResult } from "../../../src/types"
import { handlingErrors, isResult } from "../../../src/utils"

describe("errors.ts", () => {
  describe("isResult", () => {
    it("Should have a valid value to not return a error", () => {
      const data = { name: "Fernando" }

      const result = isResult(data)

      expect(result.isError).toBe(false)
    })

    it("Should have a invalid value to return a error", () => {
      const data: IResult = {
        message: "",
        isError: true,
        error: "Invalid value"
      }

      const result = isResult(data)

      expect(result.isError).toBe(true)
      expect(result.error).toBe("Invalid value")
    })
  })

  describe("handlingErrors", () => {
    it("Should return a answer for a unknown error", () => {
      const error: unknown = new Error("Generic Error")
      const result = handlingErrors(error)

      expect(result.isError).toBe(true)
      expect(result.error).toBe("Generic Error")
    })
  })
})
