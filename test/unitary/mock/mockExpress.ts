import type { Request } from "express"

interface IMockReq {
  userId?: string
  pokemonId?: string
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
