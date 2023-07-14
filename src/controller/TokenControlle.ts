import type { Response } from "express"
import type { TokenUser } from "../service"

export class TokenController {
  constructor(
    private readonly _res: Response,
    private readonly _TokenUser: TokenUser
  ) {}

  async sendNewTokens(): Promise<void> {
    const result = await this._TokenUser.newTokens(this._res)
    const { data, ...resultWithoutData } = result

    if (result.isError) {
      this._res.status(401).send(result)
      return
    }
    this._res
      .status(200)
      .cookie("accessToken", result.data.accessToken, {
        maxAge: 4.32e8,
        httpOnly: true
      })
      .cookie("refreshToken", result.data.refreshToken, {
        maxAge: 4.32e8,
        httpOnly: true
      })
      .send(resultWithoutData)
  }
}
