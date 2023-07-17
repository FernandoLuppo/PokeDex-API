import { Axios } from "../../../../src/service/axios/Axios"
import * as dotenv from "dotenv"
dotenv.config()

describe("Axios.ts", () => {
  it("Should return a valid axios instance with the correct baseUrl", () => {
    const originalEnv = process.env

    process.env = { ...originalEnv, BASE_URL: "https://example.com/api" }

    const axios = new Axios()
    const axiosInstance = axios.baseUrl()

    expect(axiosInstance.get).toBeInstanceOf(Function)
    expect(axiosInstance.put).toBeInstanceOf(Function)
    expect(axiosInstance.post).toBeInstanceOf(Function)
    expect(axiosInstance.delete).toBeInstanceOf(Function)

    process.env = originalEnv
  })
})
