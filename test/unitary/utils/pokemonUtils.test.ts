import { pokemonEvolutionUrl, pokemonUrlHandleErrors } from "../../../src/utils"

describe("pokemon.ts", () => {
  describe("pokemonUrlHandleErrors", () => {
    it("Should return a valid value without errors in the process", () => {
      const data = { name: "Charmander", type: "Fire", id: 4 }
      const result = pokemonUrlHandleErrors(data)

      expect(result.isError).toBe(false)
      expect(result.data).toBeDefined()
    })

    it("Should return a error log", () => {
      const data = undefined
      const result = pokemonUrlHandleErrors(data)

      expect(result.isError).toBe(true)
      expect(result.error).toBe("Error when trying to access the PokedexAPI")
    })
  })

  describe("pokemonEvolutionUrl", () => {
    it("Should return the pokemon id to search he's evolution", () => {
      const id = "42"
      const url = `https://pokeapi.co/api/v2/evolution-chain/${id}/`
      const result = pokemonEvolutionUrl(url)

      expect(result).toBeDefined()
      expect(result).toEqual(id)
    })
  })
})
