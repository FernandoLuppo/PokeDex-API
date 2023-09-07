import type { IResult } from "../../types"
import { Axios } from "../axios/Axios"
import { handlingErrors, pokemonUrlHandleErrors } from "../../utils"

export class PokemonUrl {
  async getAll(start: number, end: number): Promise<IResult> {
    let result: IResult = { message: "", isError: false, error: "", data: {} }

    try {
      const { data } = await new Axios()
        .baseUrl()
        .get(`/pokemon?offset=${start}&limit=${end}`)
      result = pokemonUrlHandleErrors(data)

      return result
    } catch (err) {
      return handlingErrors(err)
    }
  }

  async getOne(pokemon: string | number): Promise<IResult> {
    let result: IResult = { message: "", isError: false, error: "", data: {} }
    try {
      const { data } = await new Axios().baseUrl().get(`/pokemon/${pokemon}`)
      result = pokemonUrlHandleErrors(data)
      return result
    } catch (err) {
      return handlingErrors(err)
    }
  }

  async getSpecie(pokemon: string | number): Promise<IResult> {
    let result: IResult = { message: "", isError: false, error: "", data: {} }

    try {
      const { data } = await new Axios()
        .baseUrl()
        .get(`/pokemon-species/${pokemon}`)
      result = pokemonUrlHandleErrors(data)

      return result
    } catch (err) {
      return handlingErrors(err)
    }
  }

  async getEvolutionChain(pokemonUrl: string): Promise<IResult> {
    let result: IResult = { message: "", isError: false, error: "", data: {} }

    try {
      const { data } = await new Axios()
        .baseUrl()
        .get(`/evolution-chain/${pokemonUrl}`)
      result = pokemonUrlHandleErrors(data)

      return result
    } catch (err) {
      return handlingErrors(err)
    }
  }
}
