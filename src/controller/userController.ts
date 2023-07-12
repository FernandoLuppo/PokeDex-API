import type { Response } from "express"
import type { User } from "../service"

export class UserController {
  constructor(
    private readonly _res: Response,
    private readonly _User: User
  ) {}

  async register(): Promise<void> {
    const user = await this._User.register()

    if (user.isError) {
      this._res.status(400).send(user)
      return
    }

    this._res.status(201).send(user)
  }
}
