import { PokemonUrl } from "../../../../src/service"
import * as dotenv from "dotenv"
import { mockPokemonUrl } from "../../mock/mockPokemonUrl"
dotenv.config()

describe("PokemonUrl.ts", () => {
  mockPokemonUrl()

  describe("getAll", () => {
    it("Should get a list o pokemon", async () => {
      const url = new PokemonUrl()
      const result = await url.getAll()

      expect(result.isError).toBe(false)
      expect(result.data).toBeDefined()
    })
  })
  describe("getOne", () => {
    it("Should get just one pokemon", async () => {
      const url = new PokemonUrl()
      const result = await url.getOne(1)

      expect(result.isError).toBe(false)
      expect(result.data).toBeDefined()
    })
  })
  describe("getSpecie", () => {
    it("Should get the specie of a pokemon", async () => {
      const url = new PokemonUrl()
      const result = await url.getSpecie(1)

      expect(result.isError).toBe(false)
      expect(result.data).toBeDefined()
    })
  })
  describe("getEvolutionChain", () => {
    it("Should get the evolution chain of a pokemon", async () => {
      const url = new PokemonUrl()
      const result = await url.getEvolutionChain("1")

      expect(result.isError).toBe(false)
      expect(result.data).toBeDefined()
    })
  })
})
