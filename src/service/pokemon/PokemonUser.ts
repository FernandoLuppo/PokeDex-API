import type { Request } from "express"
import { model } from "mongoose"
import "../../model/Pokemon"
import type { IResult } from "../../types"
import { handlingErrors, isResult } from "../../utils"
import type { PokemonApi } from "./PokemonApi"

export class PokemonUser {
  constructor(
    private readonly _req: Request,
    private readonly _PokemonApi: PokemonApi
  ) {}

  async userTeam(): Promise<IResult> {
    const result: IResult = { message: "", isError: false, error: "", data: {} }
    const { data } = await this._getTeam()
    const teamPromise = data.map(async (pokemon: number) => {
      const infos = await this._PokemonApi.getOne(pokemon)

      const data = {
        pokemonMovie: infos.pokemonMovie,
        pokemonStats: infos.pokemonStats,
        types: infos.types,
        genericInfos: infos.genericInfos,
        levels: infos.levels,
        description: infos.description
      }

      return {
        pokemon: data
      }
    })

    const team = await Promise.all(teamPromise)
    result.data = team
    result.message = "Team uploaded successfully"

    return result
  }

  async addPokemon(): Promise<IResult> {
    const result: IResult = { message: "", isError: false, error: "", data: {} }
    if (this._req.user === undefined) {
      result.isError = true
      result.error = "User id is undefined"
      return result
    }

    const Pokemon = model("pokemons")
    const pokemonId = this._req.body.id
    const userId = this._req.user.id

    const addPokemonValidation = await this._addPokemonValidation()

    if (isResult(addPokemonValidation).isError) {
      return isResult(addPokemonValidation)
    }
    const trainer = await Pokemon.findOne({ pokemonTrainer: userId })

    try {
      const newTeam = [...trainer.pokeId, pokemonId]
      await Pokemon.updateOne({ pokeId: newTeam })

      result.message = "Pokemon added to team"
      result.data = await this.userTeam()

      return result
    } catch (err) {
      return handlingErrors(err)
    }
  }

  async removePokemon(): Promise<IResult> {
    const result: IResult = { message: "", isError: false, error: "", data: {} }
    if (this._req.user === undefined) {
      result.isError = true
      result.error = "User id is undefined"
      return result
    }

    const Pokemon = model("pokemons")
    const pokemonId = this._req.body.id
    const userId = this._req.user.id

    const trainer = await Pokemon.findOne({ pokemonTrainer: userId })

    try {
      await this._removePokemonValidation()
      const newTeam = trainer.pokeId.filter((num: number) => num !== pokemonId)
      await Pokemon.updateOne({ pokeId: newTeam })
      result.message = "Pokemon removed from team"
      result.data = await this.userTeam()

      return result
    } catch (err) {
      return handlingErrors(err)
    }
  }

  private async _addPokemonValidation(): Promise<IResult> {
    const result: IResult = { message: "", isError: false, error: "", data: {} }
    if (this._req.user === undefined) {
      result.isError = true
      result.error = "User id is undefined"
      return result
    }

    const userId = this._req.user.id
    const pokemonId = this._req.body.id
    const Pokemon = model("pokemons")
    const trainer = await Pokemon.findOne({ pokemonTrainer: userId })

    try {
      if (trainer.pokeId.length > 6) {
        result.isError = true
        result.error = "Team already full"
        return result
      }

      trainer.pokeId.forEach((id: number) => {
        if (id === pokemonId) {
          result.isError = true
          result.error = "This Pokemon is already in your team"
          return result
        }
      })

      return result
    } catch (err) {
      return handlingErrors(err)
    }
  }

  private async _removePokemonValidation(): Promise<IResult> {
    const result: IResult = { message: "", isError: false, error: "", data: {} }
    if (this._req.user === undefined) {
      result.isError = true
      result.error = "User id is undefined"
      return result
    }

    const Pokemon = model("pokemons")
    const id = this._req.user.id
    const pokemonId = this._req.body.id
    const trainer = await Pokemon.findOne({ pokemonTrainer: id })
    let isInTeam

    try {
      trainer.pokeId.forEach((num: number) => {
        if (num === pokemonId) {
          isInTeam = true
          return isInTeam
        }
        isInTeam = false
        return isInTeam
      })

      if (isInTeam === false) {
        result.isError = true
        result.error = "This pokemon is not part of your team"
        return result
      }

      return result
    } catch (err) {
      return handlingErrors(err)
    }
  }

  private async _getTeam(): Promise<IResult> {
    const result: IResult = { message: "", isError: false, error: "", data: {} }
    if (this._req.user === undefined) {
      result.isError = true
      result.error = "User id is undefined"
      return result
    }

    const { id } = this._req.user
    const Pokemon = model("pokemons")

    try {
      const pokemon = await Pokemon.findOne({ pokemonTrainer: id })
      result.data = pokemon.pokeId

      return result
    } catch (err) {
      return handlingErrors(err)
    }
  }
}
