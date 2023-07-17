import { EncryptPassword } from "../../../../src/service"

describe("EncryptPassword.ts", () => {
  describe("encrypt", () => {
    it("Should encrypt the user password", () => {
      const userPassword = "abc12345"

      const encryptPassword = new EncryptPassword()
      const { encryptedUserPassword } = encryptPassword.encrypt(userPassword)

      expect(encryptedUserPassword).not.toBe(userPassword)
      expect(encryptedUserPassword).not.toBeUndefined()
      expect(encryptedUserPassword.length).toBeGreaterThan(userPassword.length)
    })
  })

  describe("compare", () => {
    it("Should compare the user password and the banc password correctly", async () => {
      const userPassword = "abc12345"

      const encryptPassword = new EncryptPassword()
      const { encryptedUserPassword } = encryptPassword.encrypt(userPassword)

      const result = await encryptPassword.compare(
        userPassword,
        encryptedUserPassword
      )

      expect(result.isError).toBe(false)
      expect(result.message).toBe("Successful password compare")
    })

    it("Should return a error when try to compare the user password and the banc password", async () => {
      const userPassword = "abc12345"
      const bancPassword = "abc12345"

      const encryptPassword = new EncryptPassword()

      const result = await encryptPassword.compare(userPassword, bancPassword)

      expect(result.isError).toBe(true)
      expect(result.error).toBe("Email or password incorrect")
    })
  })
})
