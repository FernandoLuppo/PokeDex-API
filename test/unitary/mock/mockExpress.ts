import type { Request } from "express"

export const mockReq = (): Request => {
  const req = {
    body: {
      name: "Fernando Luppo",
      email: "fernandoluppo2@gmail.com",
      password: "12345"
    }
  }

  return req as Request
}

export const mockReqId = (id: string): Request => {
  const req = {
    body: {
      name: "Fernando Luppo",
      email: "fernandoluppo2@gmail.com",
      password: "12345"
    },
    user: {
      id
    },
    cookies: {
      refreshToken: ""
    }
  }

  return req as Request
}

export const mockReqRefreshToken = (refreshToken: string): Request => {
  const req = {
    body: {
      name: "Fernando Luppo",
      email: "fernandoluppo2@gmail.com",
      password: "12345"
    },
    cookies: {
      refreshToken,
      accessToken: "ola"
    }
  }

  return req as Request
}

export const mockReqError = (): Request => {
  const req = {
    body: {
      name: "",
      password: ""
    }
  }

  return req as Request
}
