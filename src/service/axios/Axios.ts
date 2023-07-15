import axios from "axios"
import type { AxiosInstance } from "axios"

export class Axios {
  baseUrl(): AxiosInstance {
    const { BASE_URL } = process.env

    return axios.create({
      baseURL: BASE_URL
    })
  }
}
