export interface IResult {
  message: string
  isError: boolean
  error: string | string[]
  data?: any
}
