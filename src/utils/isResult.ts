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
