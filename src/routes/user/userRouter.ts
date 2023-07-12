import { Router } from "express"
import type { Request, Response } from "express"
import { Authenticate } from "../../middleware"
import { UserController } from "../../controller"
import { User } from "../../service/user/User"
import { EncryptPassword } from "../../service/encryptPassword/EncryptPassword"

const userRouter = Router()
const authenticate = new Authenticate()

userRouter.post(
  "/register",
  authenticate.register,
  async (req: Request, res: Response) => {
    const encryptPassword = new EncryptPassword()
    const user = new User(req, encryptPassword)
    await new UserController(res, user).register()
  }
)

export { userRouter }
