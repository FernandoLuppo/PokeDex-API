import { PokemonApi, PokemonUrl, PokemonUser } from "../../../src/service"
import type { IResult } from "../../../src/types"
import { mockReq, mockUserID } from "./mockExpress"
import { mockRegister } from "./mockUser"

export const mockAddPokemon = async (
  pokemonId: number | null
): Promise<IResult> => {
  const req = mockReq(null)
  await mockRegister(req)
  const newReq = await mockUserID(req)
  newReq.body.id = pokemonId

  const url = new PokemonUrl()
  const api = new PokemonApi(url)
  const pokemon = new PokemonUser(newReq, api)

  return await pokemon.addPokemon()
}

export const mockRemovePokemon = async (
  pokemonId: number
): Promise<IResult> => {
  const req = mockReq(null)
  await mockRegister(req)
  const newReq = await mockUserID(req)
  newReq.body.id = pokemonId

  const url = new PokemonUrl()
  const api = new PokemonApi(url)
  const pokemon = new PokemonUser(newReq, api)

  return await pokemon.removePokemon()
}
