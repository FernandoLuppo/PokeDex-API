import type { Request } from "express"
import { model } from "mongoose"
import "../../model/User"
import "../../model/Pokemon"
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

  async register(): Promise<IResult> {
    let result: IResult = { message: "", isError: false, error: "" }
    const User = model("users")
    const Pokemon = model("pokemons")

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
      await new User(newUser).save().then(async (user: { id: string }) => {
        await new Pokemon({ pokemonTrainer: user.id }).save()
      })

      result.message = "User registered with success"

      return result
    } catch (err) {
      const error = err as Error
      result.isError = true
      result.error = error.message
      return result
    }
  }

  async login() {
    let result: IResult = { message: "", isError: false, error: "" }
    const User = model("users")

    const loginValidate = await this._loginValidation()

    function isIResult(data: { id: string } | IResult): data is IResult {
      return "isError" in data
    }

    if (isIResult(loginValidate)) {
      result = loginValidate
      return result
    }

    try {
    } catch (err) {}
  }

  private async _loginValidation(): Promise<IResult | { id: string }> {
    const result: IResult = { message: "", isError: false, error: "" }
    const User = model("users")
    const { email, password } = this._req.body

    const user = await User.findOne({ email })

    try {
      if (user === null) {
        result.isError = true
        result.error = "Email or password incorrect"
        return result
      }

      const bancPassword = user.password
      await this._EncryptPassword.compare(password, bancPassword)

      return user.id
    } catch (err) {
      const error = err as Error
      result.isError = true
      result.error = error.message
      return result
    }
  }

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
}
