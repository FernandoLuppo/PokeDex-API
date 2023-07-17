import { Email } from "../../../../src/service"
import * as dotenv from "dotenv"
import { mockEmail } from "../../mock"
dotenv.config()

describe("Email.ts", () => {
  mockEmail()

  it("Should send a email to user", async () => {
    const code = [1, 2, 3, 4, 5, 6]
    const recipient = "fernandoluppo2@gmail.com"

    const email = new Email()
    const sendEmail = await email.recoverPassword(recipient, code)

    expect(sendEmail.isError).toBe(false)
    expect(sendEmail.message).toBe("Email successfully sent")
  })

  it("Should return an error when trying to send the email to the user", async () => {
    const originalEnv = process.env
    process.env = { ...originalEnv, EMAIL_PASSWORD: "test" }

    const code = [1, 2, 3, 4, 5, 6]
    const recipient = "fernandoluppo2@gmail.com"

    const email = new Email()
    const sendEmail = await email.recoverPassword(recipient, code)

    expect(sendEmail.isError).toBe(true)
    expect(sendEmail.error).toBeDefined()

    process.env = originalEnv
  })
})
