import { Router } from "express"
import type { Request, Response } from "express"
import { TokenController } from "../../controller/TokenControlle"
import { Token, TokenUser } from "../../service"
import { TokenAuthenticate } from "../../middleware"

const tokenRouter = Router()
const token = new Token()
const tokenAuthenticate = new TokenAuthenticate()

tokenRouter.put(
  "/new-token",
  tokenAuthenticate.refreshTokenAuthenticate,
  async (req: Request, res: Response) => {
    const tokenUser = new TokenUser(req, token)
    await new TokenController(res, tokenUser).sendNewTokens()
  }
)

export { tokenRouter }
