import { model } from "mongoose"
import { Token } from "../../../src/service"
import { mockReq } from "../../unitary/mock"

export const mockTokens = async (): Promise<{
  cookiesAccessTokenValidValue: string
  cookiesRefreshTokenValidValue: string
}> => {
  const User = model("users")
  const user = await User.find()

  const token = new Token()
  const accessTokenValues = token.createAccessToken(user[0].id)
  const refreshTokenValues = token.createRefreshToken(user[0].id)

  const { accessToken } = accessTokenValues as {
    accessToken: string
  }
  const { refreshToken } = refreshTokenValues as {
    refreshToken: string
  }

  const newReq = mockReq({
    accessToken,
    refreshToken,
    userId: user[0].id
  })

  const cookiesAccessToken: string = newReq.cookies.accessToken
  const cookiesRefreshToken: string = newReq.cookies.refreshToken
  const cookiesAccessTokenValidValue = `accessToken=${cookiesAccessToken}`
  const cookiesRefreshTokenValidValue = `refreshToken=${cookiesRefreshToken}`

  return { cookiesAccessTokenValidValue, cookiesRefreshTokenValidValue }
}
