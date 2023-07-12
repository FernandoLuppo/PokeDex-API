import bcryptjs from "bcrypt"
import type { IResult } from "../../types"

export class EncryptPassword {
  encrypt(userPassword: string): { encryptedUserPassword: string } {
    const encryption = bcryptjs.genSaltSync(10)
    const encryptedUserPassword = bcryptjs.hashSync(userPassword, encryption)

    return { encryptedUserPassword }
  }

  async compare(userPassword: string, bancPassword: string): Promise<IResult> {
    const result: IResult = { message: "", isError: false, error: "" }

    try {
      await bcryptjs.compare(userPassword, bancPassword)

      return result
    } catch (err) {
      const error = err as Error
      result.isError = true
      result.error = error.message
      return result
    }
  }
}
