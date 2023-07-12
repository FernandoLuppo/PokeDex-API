import type { Request } from "express"
import { model } from "mongoose"
import "../../model/User"
import type { EncryptPassword } from "../encryptPassword/EncryptPassword"
import type { IResult } from "../../types"

interface IRegisterValidation {
  name: string
  email: string
  password: string
}

export class User {
  constructor(
    private readonly _req: Request,
    private readonly _EncryptPassword: EncryptPassword
  ) {}

  private async _registerValidation(): Promise<IResult | IRegisterValidation> {
    const result: IResult = { message: "", isError: false, error: "" }
    const User = model("users")
    const { name, email, password } = this._req.body

    const user = await User.findOne({ email })

    try {
      if (user === null) {
        const { encryptedUserPassword } =
          this._EncryptPassword.encrypt(password)
        const newUser = {
          name,
          email,
          password: encryptedUserPassword
        }

        return newUser
      }

      result.isError = true
      result.error = "User already exist!"
      return result
    } catch (err) {
      const error = err as Error
      result.isError = true
      result.error = error.message
      return result
    }
  }

  async register(): Promise<IResult> {
    let result: IResult = { message: "", isError: false, error: "" }
    const User = model("users")

    const newUser = await this._registerValidation()

    function isIResult(
      newUser: IResult | IRegisterValidation
    ): newUser is IResult {
      return "isError" in newUser
    }

    if (isIResult(newUser)) {
      result = newUser
      return result
    }

    try {
      await new User(newUser).save()
      result.message = "User registered with success"

      return result
    } catch (err) {
      const error = err as Error
      result.isError = true
      result.error = error.message
      return result
    }
  }
}
