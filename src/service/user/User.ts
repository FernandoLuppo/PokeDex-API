import type { Request } from "express"
import { model } from "mongoose"
import "../../model/User"
import "../../model/Pokemon"
import type { EncryptPassword } from "../encryptPassword/EncryptPassword"
import type { IResult } from "../../types"
import type { TokenUser } from "../token/TokenUser"
import { handlingErrors, isResult } from "../../utils"

interface IRegisterValidation {
  name: string
  email: string
  password: string
}

export class User {
  constructor(private readonly _req: Request) {}

  async register(EncryptPassword: EncryptPassword): Promise<IResult> {
    const result: IResult = { message: "", isError: false, error: "" }
    const User = model("users")
    const Pokemon = model("pokemons")

    const newUser = await this._registerValidation(EncryptPassword)

    if (isResult(newUser).isError) {
      return isResult(newUser)
    }

    try {
      await new User(newUser).save().then(async (user: { id: string }) => {
        await new Pokemon({ pokemonTrainer: user.id }).save()
      })

      result.message = "User registered with success"

      return result
    } catch (err) {
      return handlingErrors(err)
    }
  }

  async login(
    TokenUser: TokenUser,
    EncryptPassword: EncryptPassword
  ): Promise<IResult> {
    const result: IResult = { message: "", isError: false, error: "", data: {} }
    const userId = await this._loginValidation(EncryptPassword)

    if (isResult(userId).isError) {
      return isResult(userId)
    }

    try {
      const { id } = userId as { id: string }
      const loginTokenValidation = await TokenUser.loginAccessTokenValidation(
        id
      )

      if (isResult(loginTokenValidation).isError) {
        return isResult(loginTokenValidation)
      }

      const { accessToken, refreshToken } = loginTokenValidation as {
        accessToken: string
        refreshToken: string
      }
      result.data = { accessToken, refreshToken }
      result.message = "User Logged with success"

      return result
    } catch (err) {
      return handlingErrors(err)
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
      return handlingErrors(err)
    }
  }

  private async _loginValidation(
    EncryptPassword: EncryptPassword
  ): Promise<IResult | { id: string }> {
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

      const id = user.id

      return { id }
    } catch (err) {
      return handlingErrors(err)
    }
  }
}
