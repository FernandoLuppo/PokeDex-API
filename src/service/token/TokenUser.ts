import "../../model/RefreshToken"
import type { Token } from "./Token"
import type { IResult } from "../../types"
import { handlingErrors, isResult } from "../../utils"
import type { Request } from "express"
import { verify } from "jsonwebtoken"
import { model } from "mongoose"

export class TokenUser {
  constructor(
    private readonly _req: Request,
    private readonly _Token: Token
  ) {}

  async loginAccessTokenValidation(id: string): Promise<IResult> {
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
        result.message = "Tokens create with success"
        result.data = { accessToken, refreshToken }
        return result
      }

      await RefreshToken.updateOne(
        { userToken: id },
        {
          $set: {
            refreshToken: newRefreshToken.refreshToken,
            expireDat: newRefreshToken.expireDat
          }
        }
      )

      result.message = "Tokens create with success"
      result.data = { accessToken, refreshToken }
      return result
    } catch (err) {
      return handlingErrors(err)
    }
  }

  async newTokens(): Promise<IResult> {
    const result: IResult = { message: "", isError: false, error: "", data: {} }
    const RefreshToken = model("refreshTokens")
    const refreshToken = this._req.cookies["refreshToken"]

    const { REFRESH_TOKEN } = process.env

    if (refreshToken === null) {
      result.isError = true
      result.error = "Cookie is missing"
      return result
    }

    if (REFRESH_TOKEN === undefined) {
      result.isError = true
      result.error = "Cookie is missing"
      return result
    }

    const { sub } = verify(refreshToken, REFRESH_TOKEN) as { sub: string }
    const refreshT = await RefreshToken.findOne({ userToken: sub })

    try {
      const id = refreshT.userToken.toString()

      const accessTokenValues = this._Token.createAccessToken(id)
      const refreshTokenValues = this._Token.createRefreshToken(id)

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

      await RefreshToken.updateOne(
        { userToken: sub },
        {
          $set: {
            refreshToken: newRefreshToken.refreshToken,
            expireDat: newRefreshToken.expireDat
          }
        }
      )

      result.message = "New tokens create with success"
      result.data = { accessToken, refreshToken }
      return result
    } catch (err) {
      return handlingErrors(err)
    }
  }
}
