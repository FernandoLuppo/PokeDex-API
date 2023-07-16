import { Axios } from "../axios/Axios"
import type { IResult } from "../../types"
import { pokemonUrlHandleErrors } from "../../utils"

export class PokemonUrl {
  async getAll(): Promise<IResult> {
    let result: IResult = { message: "", isError: false, error: "", data: {} }
    const { data } = await new Axios().baseUrl().get("/pokemon")
    result = pokemonUrlHandleErrors(data)

    return result
  }

  async getOne(pokemon: string | number): Promise<IResult> {
    let result: IResult = { message: "", isError: false, error: "", data: {} }
    const { data } = await new Axios().baseUrl().get(`/pokemon/${pokemon}`)
    result = pokemonUrlHandleErrors(data)

    return result
  }

  async getSpecie(pokemon: string | number): Promise<IResult> {
    let result: IResult = { message: "", isError: false, error: "", data: {} }
    const { data } = await new Axios()
      .baseUrl()
      .get(`/pokemon-species/${pokemon}`)
    result = pokemonUrlHandleErrors(data)

    return result
  }

  async getEvolutionChain(pokemonUrl: string): Promise<IResult> {
    let result: IResult = { message: "", isError: false, error: "", data: {} }
    const { data } = await new Axios()
      .baseUrl()
      .get(`/evolution-chain/${pokemonUrl}`)
    result = pokemonUrlHandleErrors(data)

    return result
  }
}
