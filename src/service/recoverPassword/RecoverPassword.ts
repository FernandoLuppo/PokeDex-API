import "../../model/User"
import type { Email } from "../email/Email"
import type { IResult } from "../../types"
import type { EncryptPassword } from "../encryptPassword/EncryptPassword"
import { codeGenerator, handlingErrors, isResult } from "../../utils"
import type { Request } from "express"
import { model } from "mongoose"

export class RecoverPassword {
  constructor(
    private readonly _req: Request,
    private readonly Email: Email
  ) {}

  async checkEmail(): Promise<IResult> {
    const result: IResult = { message: "", isError: false, error: "", data: {} }
    const User = model("users")
    const { email } = this._req.body

    const code = codeGenerator()
    const user = await User.findOne({ email })
    if (user === null) {
      result.isError = true
      result.error = "This email does not exist"
      return result
    }

    try {
      const recoverPasswordConfig = this.Email.recoverPassword(email, code)

      if (isResult(recoverPasswordConfig).isError) {
        return isResult(recoverPasswordConfig)
      }

      result.data = { email: user.email, code }
      return result
    } catch (err) {
      return handlingErrors(err)
    }
  }

  async newPassword(EncryptPassword: EncryptPassword): Promise<IResult> {
    const result: IResult = { message: "", isError: false, error: "" }
    const User = model("users")
    const { password, email } = this._req.body

    const newPassword = EncryptPassword.encrypt(password)

    if (isResult(newPassword).isError) {
      return isResult(newPassword)
    }

    const user = await User.findOne({ email })

    if (user === null) {
      result.isError = true
      result.error = "This user does not exist"
      return result
    }

    try {
      await User.updateOne({ password: newPassword.encryptedUserPassword })
      result.message = "Password successfully updated"

      return result
    } catch (err) {
      return handlingErrors(err)
    }
  }
}
