import type { IResult } from "../../../src/types"
import { PokemonApi, PokemonUrl, PokemonUser } from "../../../src/service"
import type { Request } from "express"

export const mockAddPokemon = async (
  pokemonId: number,
  req: Request
): Promise<IResult> => {
  req.body.id = pokemonId

  const url = new PokemonUrl()
  const api = new PokemonApi(url)
  const pokemon = new PokemonUser(req, api)

  return await pokemon.addPokemon()
}

export const mockRemovePokemon = async (
  pokemonId: number,
  req: any
): Promise<IResult> => {
  req.params.id = pokemonId
  const url = new PokemonUrl()
  const api = new PokemonApi(url)
  const pokemon = new PokemonUser(req, api)

  return await pokemon.removePokemon()
}

export const mockGetTeam = async (req: Request): Promise<IResult> => {
  const url = new PokemonUrl()
  const api = new PokemonApi(url)
  const pokemon = new PokemonUser(req, api)

  return await pokemon.userTeam()
}
