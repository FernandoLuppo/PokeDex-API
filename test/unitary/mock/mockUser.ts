import type { Request } from "express"
import { EncryptPassword, Token, TokenUser, User } from "../../../src/service"
import type { IResult } from "../../../src/types"

export const mockRegister = async (req: Request): Promise<IResult> => {
  const user = new User(req)
  const encryptPassword = new EncryptPassword()
  const result = await user.register(encryptPassword)

  return result
}

export const mockLogin = async (req: Request): Promise<IResult> => {
  const user = new User(req)
  const token = new Token()
  const tokenUser = new TokenUser(req, token)
  const encryptPassword = new EncryptPassword()
  const result = await user.login(tokenUser, encryptPassword)

  return result
}

export const mockGetUserInfos = async (req: Request): Promise<IResult> => {
  const user = new User(req)
  const result = await user.getUserInfos()

  return result
}

export const mockNewUserInfos = async (req: Request): Promise<IResult> => {
  const user = new User(req)
  const result = await user.newUserInfos()

  return result
}
