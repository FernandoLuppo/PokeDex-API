import { Authenticate } from "../../middleware"
import { RecoverPasswordController } from "../../controller/recoverPasswordController"
import { Email, EncryptPassword, RecoverPassword } from "../../service"
import type { Request, Response } from "express"
import { Router } from "express"

const recoverPasswordRouter = Router()
const authenticate = new Authenticate()
const encryptPassword = new EncryptPassword()

recoverPasswordRouter.post(
  "/check-email",
  authenticate.emailRecoverPassword,
  async (req: Request, res: Response) => {
    const email = new Email()
    const recoverPassword = new RecoverPassword(req, email)
    await new RecoverPasswordController(res, recoverPassword).checkEmail()
  }
)

recoverPasswordRouter.put(
  "/new-password",
  authenticate.recoverPassword,
  async (req: Request, res: Response) => {
    const email = new Email()
    const recoverPassword = new RecoverPassword(req, email)
    await new RecoverPasswordController(res, recoverPassword).newPassword(
      encryptPassword
    )
  }
)

export { recoverPasswordRouter }
