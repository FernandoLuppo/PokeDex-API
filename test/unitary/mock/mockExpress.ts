import type { Request } from "express"
import { mockLogin } from "./mockUser"
import { model } from "mongoose"

interface IMockReq {
  userId?: string
  pokemonId?: number
  accessToken?: string
  refreshToken?: string
}

export const mockReq = (data: IMockReq | null): Request => {
  const req = {
    body: {
      name: "Fernando Luppo",
      email: "fernandoluppo2@gmail.com",
      password: "12345",
      id: data?.pokemonId
    },
    user: {
      id: data?.userId
    },
    cookies: {
      accessToken: data?.accessToken,
      refreshToken: data?.refreshToken
    }
  }

  return req as Request
}

export const mockReqError = (): Request => {
  const req = {
    body: {}
  }

  return req as Request
}

export const mockUserID = async (req: Request): Promise<Request> => {
  await mockLogin(req)
  const User = model("users")
  const user = await User.find()
  const id: string = user[0].id

  return mockReq({ userId: id })
}
