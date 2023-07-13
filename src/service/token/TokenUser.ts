import type { Request } from "express"
import { model } from "mongoose"
import "../../model/RefreshToken"
import type { Token } from "./Token"
import type { IResult } from "../../types"

export class TokenUser {
  constructor(
    private readonly _req: Request,
    private readonly _Token: Token
  ) {}

  async loginAccessTokenValidation(
    id: string
  ): Promise<IResult | { accessToken: string; refreshToken: string }> {
    let result: IResult = { message: "", isError: false, error: "" }
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

      function isAccessToken(
        accessTokenValues: IResult | { accessToken: string }
      ): accessTokenValues is IResult {
        return "isError" in accessTokenValues
      }

      function isRefreshToken(
        refreshTokenValues:
          | IResult
          | { refreshToken: string; refreshTokenExpiresDate: Date }
      ): refreshTokenValues is IResult {
        return "isError" in refreshTokenValues
      }

      if (isAccessToken(accessTokenValues)) {
        result = accessTokenValues
        return result
      }
      if (isRefreshToken(refreshTokenValues)) {
        result = refreshTokenValues
        return result
      }

      const { accessToken } = accessTokenValues
      const { refreshToken, refreshTokenExpiresDate } = refreshTokenValues
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
      const error = err as Error
      result.isError = true
      result.error = error.message
      return result
    }
  }
}
