import { Authenticate, TokenAuthenticate } from "../../middleware"
import { UserController } from "../../controller/UserController"
import { User } from "../../service/user/User"
import { EncryptPassword } from "../../service/encryptPassword/EncryptPassword"
import { Token, TokenUser } from "../../service"
import type { Request, Response } from "express"
import { Router } from "express"

const userRouter = Router()
const authenticate = new Authenticate()
const tokenAuthenticate = new TokenAuthenticate()
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

userRouter.get("/logout", (req: Request, res: Response) => {
  res.clearCookie("accessToken").clearCookie("refreshToken")
  res
    .status(200)
    .send({ message: "Exited with success", isError: false, error: "" })
})

userRouter.get(
  "/infos",
  tokenAuthenticate.accessTokenAuthenticate,
  async (req: Request, res: Response) => {
    const user = new User(req)
    await new UserController(res, user).userInfos()
  }
)

userRouter.put(
  "/new-infos",
  tokenAuthenticate.accessTokenAuthenticate,
  authenticate.newUserInfos,
  async (req: Request, res: Response) => {
    const user = new User(req)
    await new UserController(res, user).newUserInfos()
  }
)

export { userRouter }
