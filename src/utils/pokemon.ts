import type { IResult } from "../types"

export const pokemonUrlHandleErrors = (data: any): IResult => {
  const result: IResult = { message: "", isError: false, error: "", data: {} }
  if (data === undefined || data === null || data === "") {
    result.isError = true
    result.error = "Error when trying to access the PokedexAPI"
    return result
  }

  result.data = data
  return result
}

export const pokemonEvolutionUrl = (evolutionChain: string): string => {
  const url = evolutionChain.slice(42 - evolutionChain.length)
  const pokemonUrl = url.slice(0, -1)

  return pokemonUrl
}
