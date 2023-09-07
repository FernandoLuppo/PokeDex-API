import {
  mockAddPokemon,
  mockGetTeam,
  mockRegister,
  mockRemovePokemon,
  mockReq,
  mockUserID
} from "../../mock"
import * as dotenv from "dotenv"
dotenv.config()

describe("PokemonUser.ts", () => {
  describe("addPokemon", () => {
    it("Should add a pokemon in user team", async () => {
      const req = mockReq(null)
      await mockRegister(req)
      const newReq = await mockUserID(req)

      const result = await mockAddPokemon(1, newReq)

      expect(result.message).toBe("Pokemon added to team")
      expect(result.isError).toBe(false)
      expect(result.data).toBeDefined()
      expect(result.data.message).toBe("Team uploaded successfully")
      expect(result.data.isError).toBe(false)
      expect(result.data.data).toBeDefined()
    })

    it("Should return a error when try add a pokemon in user team", async () => {
      const req = mockReq(null)
      await mockRegister(req)
      const newReq = await mockUserID(req)

      const result = await mockAddPokemon(9999, newReq)

      expect(result.error).toBe("Request failed with status code 404")
      expect(result.isError).toBe(true)
    })
  })

  describe("removePokemon", () => {
    it("Should remove a pokemon from user team", async () => {
      const req = mockReq(null)
      await mockRegister(req)
      const newReq = await mockUserID(req)

      await mockAddPokemon(1, newReq)
      const result = await mockRemovePokemon(1, newReq)

      expect(result.message).toBe("Pokemon removed from team")
      expect(result.isError).toBe(false)
      expect(result.data).toBeDefined()
      expect(result.data.message).toBe("Team uploaded successfully")
      expect(result.data.isError).toBe(false)
      expect(result.data.data).toBeDefined()
    })

    it("Should return a error when try remove a pokemon from user team", async () => {
      const req = mockReq(null)
      await mockRegister(req)
      const newReq = await mockUserID(req)

      const result = await mockRemovePokemon(1, newReq)

      expect(result.error).toBe("This pokemon is not part of your team")
      expect(result.isError).toBe(true)
    })
  })

  describe("userTeam", () => {
    it("Should return the user team", async () => {
      const req = mockReq(null)
      await mockRegister(req)
      const newReq = await mockUserID(req)

      await mockAddPokemon(1, newReq)
      const result = await mockGetTeam(newReq)

      expect(result.message).toBe("Team uploaded successfully")
      expect(result.isError).toBe(false)
      expect(result.data).toBeDefined()
    })

    it("Should return a error when try get user team", async () => {
      const req = mockReq(null)
      await mockRegister(req)
      const newReq = await mockUserID(req)

      await mockAddPokemon(1, newReq)
      newReq.user = undefined
      const result = await mockGetTeam(newReq)

      expect(result.error).toBe("User id is undefined")
      expect(result.isError).toBe(true)
    })
  })
})
