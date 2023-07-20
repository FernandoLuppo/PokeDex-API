import * as dotenv from "dotenv"
import { PokemonApi, PokemonUrl } from "../../../../src/service"
dotenv.config()

describe("PokemonApi.ts", () => {
  describe("getAll", () => {
    it("Should call some pokemon and they basic information", async () => {
      const url = new PokemonUrl()
      const api = new PokemonApi(url)
      const result = await api.getAll()

      console.log(result)
    })
  })
  describe("getOne", () => {})
  describe("getEvolutions", () => {})
})
