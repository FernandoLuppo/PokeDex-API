import * as dotenv from "dotenv"
import { mockAddPokemon, mockRemovePokemon } from "../../mock"
dotenv.config()

describe("PokemonUser.ts", () => {
  describe("addPokemon", () => {
    it("Should add a pokemon in user team", async () => {
      const result = await mockAddPokemon(1)

      expect(result.message).toBe("Pokemon added to team")
      expect(result.isError).toBe(false)
      expect(result.data).toBeDefined()
      expect(result.data.message).toBe("Team uploaded successfully")
      expect(result.data.isError).toBe(false)
      expect(result.data.data).toBeDefined()
    })

    it("Should return a error when try add a pokemon in user team", async () => {
      const result = await mockAddPokemon(null)

      expect(result.error).toBe("Request failed with status code 404")
      expect(result.isError).toBe(true)
    })
  })
  describe("removePokemon", () => {
    it("Should remove a pokemon from user team", async () => {
      await mockAddPokemon(1)
      const result = await mockRemovePokemon(1)

      console.log(result)

      expect(result.message).toBe("Pokemon removed from team")
      expect(result.isError).toBe(false)
      expect(result.data).toBeDefined()
      expect(result.data.message).toBe("Team uploaded successfully")
      expect(result.data.isError).toBe(false)
      expect(result.data.data).toBeDefined()
    })
  })
  describe("userTeam", () => {
    it("Should return the user team", () => {})
  })
})
