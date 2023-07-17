import nodemailer from "nodemailer"
import { recoverPasswordTemplate } from "./templates/recoverPasswordTemplates"
import { handlingErrors, isResult } from "../../utils"
import type { IResult } from "../../types"

export class Email {
  async recoverPassword(recipient: string, code: number[]): Promise<IResult> {
    const result = { message: "", isError: false, error: "", data: {} }
    const recoverPasswordConfig = this._recoverPasswordConfig()

    if (isResult(recoverPasswordConfig).isError) {
      return isResult(recoverPasswordConfig)
    }

    const template = recoverPasswordTemplate(
      recoverPasswordConfig.data.EMAIL_USER,
      recipient,
      code
    )

    try {
      await recoverPasswordConfig.data.transporter.sendMail(template)

      result.message = "Email successfully sent"
      return result
    } catch (err) {
      return handlingErrors(err)
    }
  }

  private _recoverPasswordConfig(): IResult {
    const result = { message: "", isError: false, error: "", data: {} }
    const { EMAIL_USER, EMAIL_PASSWORD } = process.env

    if (EMAIL_USER === undefined || EMAIL_PASSWORD === undefined) {
      result.isError = true
      result.error = "Undefined environment variables"
      return result
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "gmail",
      secure: true,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD
      },
      tls: {
        rejectUnauthorized: false
      }
    })

    result.data = { EMAIL_USER, transporter }

    return result
  }
}
