import type { Response } from "express"
import type { RecoverPassword, EncryptPassword } from "../service"

export class RecoverPasswordController {
  constructor(
    private readonly _res: Response,
    private readonly _RecoverPassword: RecoverPassword
  ) {}

  async checkEmail(): Promise<void> {
    const result = await this._RecoverPassword.checkEmail()

    if (result.isError) {
      this._res.status(401).send(result)
      return
    }

    this._res.status(200).send(result)
  }

  async newPassword(EncryptPassword: EncryptPassword): Promise<void> {
    const result = await this._RecoverPassword.newPassword(EncryptPassword)

    if (result.isError) {
      this._res.status(400).send(result)
      return
    }

    this._res.status(200).send(result)
  }
}
