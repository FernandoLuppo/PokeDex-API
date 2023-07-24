import type { Request, Response, NextFunction } from "express"
import type { IResult } from "../../types"
import { verify } from "jsonwebtoken"

declare global {
  namespace Express {
    interface Request {
      user?: {
        id?: string
        refreshTokenID?: string
      }
    }
  }
}

export class TokenAuthenticate {
  async accessTokenAuthenticate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const result: IResult = { message: "", isError: false, error: "" }
    const { accessToken } = req.cookies
    const { ACCESS_TOKEN } = process.env

    try {
      if (ACCESS_TOKEN !== undefined && accessToken !== null) {
        const decodedToken = verify(accessToken, ACCESS_TOKEN) as {
          sub?: string
        }

        if (decodedToken.sub !== undefined) {
          req.user = {
            id: decodedToken.sub
          }
        }

        next()
        return
      }

      result.isError = true
      result.error = "Error when trying to generate access token"
      res.status(401).send(result)
    } catch (err) {
      const error = err as Error
      result.isError = true
      result.error = error.message
      res.status(401).send(result)
    }
  }

  async refreshTokenAuthenticate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const result: IResult = { message: "", isError: false, error: "" }
    const { refreshToken } = req.cookies
    const { REFRESH_TOKEN } = process.env

    try {
      if (REFRESH_TOKEN !== undefined && refreshToken !== null) {
        const decodedRefreshToken = verify(refreshToken, REFRESH_TOKEN) as {
          sub?: string
        }

        if (decodedRefreshToken.sub !== undefined) {
          req.user = {
            id: decodedRefreshToken.sub
          }
        }

        next()
        return
      }

      result.isError = true
      result.error = "Error when trying to generate refresh token"
      res.status(401).send(result)
    } catch (err) {
      const error = err as Error
      result.isError = true
      result.error = error.message
      res.status(401).send(result)
    }
  }
}
