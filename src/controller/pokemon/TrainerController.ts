import type { PokemonUser } from "../../service"
import type { Response } from "express"

export class TrainerController {
  constructor(
    private readonly _res: Response,
    private readonly PokemonUser: PokemonUser
  ) {}

  async userTeam(): Promise<void> {
    const result = await this.PokemonUser.userTeam()

    if (result.isError) {
      this._res.status(400).send(result)
      return
    }

    this._res.status(200).send(result)
  }

  async addPokemon(): Promise<void> {
    const result = await this.PokemonUser.addPokemon()

    if (result.isError) {
      this._res.status(400).send(result)
      return
    }

    this._res.status(200).send(result)
  }

  async removePokemon(): Promise<void> {
    const result = await this.PokemonUser.removePokemon()

    if (result.isError) {
      this._res.status(400).send(result)
      return
    }

    this._res.status(200).send(result)
  }
}
