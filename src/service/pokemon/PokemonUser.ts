import "../../model/Pokemon"
import type { IResult } from "../../types"
import type { PokemonApi } from "./PokemonApi"
import { handlingErrors, isResult } from "../../utils"
import type { Request } from "express"
import { model } from "mongoose"

export class PokemonUser {
  constructor(
    private readonly _req: Request,
    private readonly _PokemonApi: PokemonApi
  ) {}

  async userTeam(): Promise<IResult> {
    let result: IResult = { message: "", isError: false, error: "", data: {} }
    const getTeam = await this._getTeam()

    if (isResult(getTeam).isError) {
      result = getTeam
      return result
    }

    const teamPromise = getTeam.data.map(async (pokemon: number) => {
      const infos = await this._PokemonApi.getOne(pokemon)

      const data = {
        pokemonMovie: infos.data.pokemonMovie,
        pokemonStats: infos.data.pokemonStats,
        types: infos.data.types,
        genericInfos: infos.data.genericInfos,
        levels: infos.data.levels,
        description: infos.data.description
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
      const removePokemonValidation = await this._removePokemonValidation()

      if (isResult(removePokemonValidation).isError) {
        return isResult(removePokemonValidation)
      }

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

      await this._PokemonApi.getOne(pokemonId)

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

      if (isInTeam !== true) {
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
