import type { Request } from "express"
import { model } from "mongoose"
import "../../model/User"
import "../../model/Pokemon"
import type { EncryptPassword } from "../encryptPassword/EncryptPassword"
import type { IResult } from "../../types"
import type { TokenUser } from "../token/TokenUser"

interface IRegisterValidation {
  name: string
  email: string
  password: string
}

export class User {
  constructor(private readonly _req: Request) {}

  async register(EncryptPassword: EncryptPassword): Promise<IResult> {
    let result: IResult = { message: "", isError: false, error: "" }
    const User = model("users")
    const Pokemon = model("pokemons")

    const newUser = await this._registerValidation(EncryptPassword)

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

  async login(
    TokenUser: TokenUser,
    EncryptPassword: EncryptPassword
  ): Promise<IResult> {
    let result: IResult = { message: "", isError: false, error: "", data: {} }
    const userId = await this._loginValidation(EncryptPassword)

    function isIResult(data: string | IResult): data is IResult {
      return typeof data !== "string"
    }

    if (isIResult(userId)) {
      result = userId
      return result
    }

    try {
      const loginTokenValidation = await TokenUser.loginAccessTokenValidation(
        userId
      )

      function isIResult(
        data: { accessToken: string; refreshToken: string } | IResult
      ): data is IResult {
        return "isError" in data
      }

      if (isIResult(loginTokenValidation)) {
        result = loginTokenValidation
        return result
      }
      const { accessToken, refreshToken } = loginTokenValidation
      result.data = { accessToken, refreshToken }
      result.message = "User Logged with success"

      return result
    } catch (err) {
      const error = err as Error
      result.isError = true
      result.error = error.message
      return result
    }
  }

  private async _loginValidation(
    EncryptPassword: EncryptPassword
  ): Promise<IResult | string> {
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
      const comparPassword = await EncryptPassword.compare(
        password,
        bancPassword
      )

      if (comparPassword.isError) {
        return comparPassword
      }

      return user.id
    } catch (err) {
      const error = err as Error
      result.isError = true
      result.error = error.message
      return result
    }
  }

  private async _registerValidation(
    EncryptPassword: EncryptPassword
  ): Promise<IResult | IRegisterValidation> {
    const result: IResult = { message: "", isError: false, error: "" }
    const User = model("users")
    const { name, email, password } = this._req.body

    const user = await User.findOne({ email })

    try {
      if (user === null) {
        const { encryptedUserPassword } = EncryptPassword.encrypt(password)
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
