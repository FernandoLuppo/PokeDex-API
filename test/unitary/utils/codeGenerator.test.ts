import { codeGenerator } from "../../../src/utils"

describe("codeGenerator.ts", () => {
  it("Should generate a random code", () => {
    const code = codeGenerator()

    expect(code).toBeDefined()
    expect(code.length).toBeGreaterThanOrEqual(6)
  })
})
