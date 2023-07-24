import type { IResult } from "../../types"
import { handlingErrors } from "../../utils"
import bcryptjs from "bcrypt"

export class EncryptPassword {
  encrypt(userPassword: string): { encryptedUserPassword: string } {
    const encryption = bcryptjs.genSaltSync(10)
    const encryptedUserPassword = bcryptjs.hashSync(userPassword, encryption)

    return { encryptedUserPassword }
  }

  async compare(userPassword: string, bancPassword: string): Promise<IResult> {
    const result: IResult = { message: "", isError: false, error: "" }

    try {
      const isEncrypted = await bcryptjs.compare(userPassword, bancPassword)

      if (isEncrypted) {
        result.message = "Successful password compare"
        return result
      }

      result.isError = true
      result.error = "Email or password incorrect"
      return result
    } catch (err) {
      return handlingErrors(err)
    }
  }
}
