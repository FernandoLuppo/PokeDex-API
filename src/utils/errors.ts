import type { IResult } from "../types"

export const isResult = (data: any): IResult => {
  let result: IResult = { message: "", isError: false, error: "" }

  function separator(data: any | IResult): data is IResult {
    return "isError" in data
  }

  if (separator(data)) {
    result = data
    return result
  }

  return result
}

export const handlingErrors = (err: unknown): IResult => {
  const result: IResult = { message: "", isError: false, error: "" }
  const error = err as Error
  result.isError = true
  result.error = error.message
  return result
}
