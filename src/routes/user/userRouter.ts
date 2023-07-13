import { Router } from "express"
import type { Request, Response } from "express"
import { Authenticate } from "../../middleware"
import { UserController } from "../../controller"
import { User } from "../../service/user/User"
import { EncryptPassword } from "../../service/encryptPassword/EncryptPassword"
import { Token, TokenUser } from "../../service"

const userRouter = Router()
const authenticate = new Authenticate()
const token = new Token()

userRouter.post(
  "/register",
  authenticate.register,
  async (req: Request, res: Response) => {
    const encryptPassword = new EncryptPassword()
    const user = new User(req)
    await new UserController(res, user).register(encryptPassword)
  }
)

userRouter.post(
  "/login",
  authenticate.login,
  async (req: Request, res: Response) => {
    const encryptPassword = new EncryptPassword()
    const user = new User(req)
    const tokenUser = new TokenUser(req, token)
    await new UserController(res, user).login(tokenUser, encryptPassword)
  }
)

export { userRouter }
