import type { Request } from "express"
import { EncryptPassword, Token, TokenUser, User } from "../../../src/service"
import type { IResult } from "../../../src/types"
import { mockReq } from "./mockExpress"
import { model } from "mongoose"

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

export const mockUserID = async (): Promise<string> => {
  const req = mockReq()
  await mockRegister(req)
  const User = model("users")
  const user = await User.find()
  const id: string = user[0].id

  return id
}
