import { sign } from "jsonwebtoken"
import type { IResult } from "../../types"
import dayjs from "dayjs"

export class Token {
  createAccessToken(id: string): { accessToken: string } | IResult {
    const result: IResult = { message: "", isError: false, error: "" }
    const { ACCESS_TOKEN } = process.env

    if (ACCESS_TOKEN === undefined) {
      result.isError = true
      result.error = "Error when trying to generate the access token"
      return result
    }

    const accessToken = sign({}, ACCESS_TOKEN, {
      subject: id,
      expiresIn: "60m"
    })

    return { accessToken }
  }

  createRefreshToken(
    id: string
  ): { refreshToken: string; refreshTokenExpiresDate: Date } | IResult {
    const result: IResult = { message: "", isError: false, error: "" }
    const { REFRESH_TOKEN } = process.env

    if (REFRESH_TOKEN === undefined) {
      result.isError = true
      result.error = "Error when trying to generate refresh token"
      return result
    }

    const refreshToken = sign({}, REFRESH_TOKEN, {
      subject: id,
      expiresIn: "5d"
    })

    const refreshTokenExpiresDate = dayjs().add(5, "days").toDate()

    return { refreshToken, refreshTokenExpiresDate }
  }
}
