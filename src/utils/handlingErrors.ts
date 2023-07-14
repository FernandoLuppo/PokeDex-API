import type { IResult } from "../types"

export const handlingErrors = (err: unknown): IResult => {
  const result: IResult = { message: "", isError: false, error: "" }
  const error = err as Error
  result.isError = true
  result.error = error.message
  return result
}
