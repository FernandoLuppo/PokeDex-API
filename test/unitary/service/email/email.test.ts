import { Email } from "../../../../src/service"
import * as dotenv from "dotenv"
dotenv.config()

describe("Email.ts", () => {
  jest.mock("nodemailer", () => ({
    createTransport: () => ({
      sendMail: jest.fn()
    })
  }))

  it("Should send a email to user", async () => {
    const code = [1, 2, 3, 4, 5, 6]
    const recipient = "fernandoluppo2@gmail.com"

    const email = new Email()
    const sendEmail = await email.recoverPassword(recipient, code)

    expect(sendEmail.isError).toBe(false)
    expect(sendEmail.message).toBe("Email successfully sent")
  })
})
