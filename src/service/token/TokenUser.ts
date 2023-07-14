import type { Request } from "express"
import { model } from "mongoose"
import "../../model/RefreshToken"
import type { Token } from "./Token"
import type { IResult } from "../../types"
import { handlingErrors, isResult } from "../../utils"

export class TokenUser {
  constructor(
    private readonly _req: Request,
    private readonly _Token: Token
  ) {}

  async loginAccessTokenValidation(
    id: string
  ): Promise<IResult | { accessToken: string; refreshToken: string }> {
    const result: IResult = { message: "", isError: false, error: "" }
    const RefreshToken = model("refreshTokens")
    const { ACCESS_TOKEN, REFRESH_TOKEN } = process.env

    if (ACCESS_TOKEN === undefined || REFRESH_TOKEN === undefined) {
      result.isError = true
      result.error = "Token Undefined"
      return result
    }

    const refreshT = await RefreshToken.findOne({
      userToken: id
    })

    try {
      const accessTokenValues = this._Token.createAccessToken(id)
      const refreshTokenValues = this._Token.createRefreshToken(id)

      if (isResult(accessTokenValues).isError) {
        return isResult(accessTokenValues)
      }

      if (isResult(refreshTokenValues).isError) {
        return isResult(refreshTokenValues)
      }

      const { accessToken } = accessTokenValues as {
        accessToken: string
      }
      const { refreshToken, refreshTokenExpiresDate } = refreshTokenValues as {
        refreshToken: string
        refreshTokenExpiresDate: Date
      }

      const newRefreshToken = {
        refreshToken,
        userToken: id,
        expireDat: refreshTokenExpiresDate
      }

      if (refreshT === null) {
        await new RefreshToken(newRefreshToken).save()
        return { accessToken, refreshToken }
      }

      await RefreshToken.updateOne({ userToken: id }, newRefreshToken)
      return { accessToken, refreshToken }
    } catch (err) {
      return handlingErrors(err)
    }
  }
}
