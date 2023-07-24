import { PokemonApi, PokemonUrl } from "../../../../src/service"
import * as dotenv from "dotenv"
dotenv.config()

describe("PokemonApi.ts", () => {
  describe("getAll", () => {
    it("Should call some pokemon and they basic information", async () => {
      jest.setTimeout(10000)
      const url = new PokemonUrl()
      const api = new PokemonApi(url)
      const result = await api.getAll()

      expect(result.message).toBe("List of pokemons uploaded successfully")
      expect(result.isError).toBe(false)
      expect(result.data).toBeDefined()
      expect(result.data.length).toBeGreaterThan(10)
      expect(result.data[0]).toHaveProperty("type")
      expect(result.data[0]).toHaveProperty("name")
      expect(result.data[0]).toHaveProperty("id")
      expect(result.data[0]).toHaveProperty("sprit")
    })
  })
  describe("getOne", () => {
    it("Should call just one pokemon and he's information", async () => {
      jest.setTimeout(10000)
      const url = new PokemonUrl()
      const api = new PokemonApi(url)
      const result = await api.getOne(1)

      expect(result.message).toBe("Pokemon uploaded successfully")
      expect(result.isError).toBe(false)
      expect(result.data).toBeDefined()
      expect(result.data).toHaveProperty("pokemonMovie")
      expect(result.data).toHaveProperty("pokemonStats")
      expect(result.data).toHaveProperty("types")
      expect(result.data).toHaveProperty("genericInfos")
      expect(result.data).toHaveProperty("levels")
      expect(result.data).toHaveProperty("description")
    })
  })
  describe("getEvolutions", () => {
    jest.setTimeout(10000)
    it("Should return the evolution information of a pokemon", async () => {
      const url = new PokemonUrl()
      const api = new PokemonApi(url)
      const result = await api.getEvolutions(1)

      expect(result.message).toBe(
        "Pokemon Evolution Chain uploaded successfully"
      )
      expect(result.isError).toBe(false)
      expect(result.data).toBeDefined()
      expect(result.data).toHaveProperty("types")
      expect(result.data).toHaveProperty("genericInfos")
      expect(result.data).toHaveProperty("levels")
    })
  })
})
