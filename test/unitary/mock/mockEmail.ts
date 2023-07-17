export const mockEmail = (): void => {
  jest.mock("nodemailer", () => ({
    createTransport: () => ({
      sendMail: jest.fn()
    })
  }))
}
