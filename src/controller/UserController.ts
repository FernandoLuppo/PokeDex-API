import type { TokenUser, User } from "../service"
import type { EncryptPassword } from "../service/encryptPassword/EncryptPassword"
import type { Response } from "express"

export class UserController {
  constructor(
    private readonly _res: Response,
    private readonly _User: User
  ) {}

  async register(EncryptPassword: EncryptPassword): Promise<void> {
    const result = await this._User.register(EncryptPassword)

    if (result.isError) {
      this._res.status(400).send(result)
      return
    }

    this._res.status(201).send(result)
  }

  async login(
    TokenUser: TokenUser,
    EncryptPassword: EncryptPassword
  ): Promise<void> {
    const result = await this._User.login(TokenUser, EncryptPassword)
    const { data, ...resultWithoutData } = result

    if (result.isError) {
      this._res.status(401).send(result)
      return
    }
    this._res
      .status(200)
      .cookie("accessToken", result.data.accessToken, {
        maxAge: 4.32e8,
        httpOnly: false,
        sameSite: "lax"
      })
      .cookie("refreshToken", result.data.refreshToken, {
        maxAge: 4.32e8,
        httpOnly: false,
        sameSite: "lax"
      })
      .send(resultWithoutData)
  }

  async userInfos(): Promise<void> {
    const result = await this._User.getUserInfos()

    if (result.isError) {
      this._res.status(400).send(result)
      return
    }

    this._res.status(200).send(result)
  }

  async newUserInfos(): Promise<void> {
    const result = await this._User.newUserInfos()

    if (result.isError) {
      this._res.status(400).send(result)
      return
    }
    this._res.status(200).send(result)
  }
}
