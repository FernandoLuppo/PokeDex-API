import type { Response } from "express"
import type { PokemonApi } from "../../service"

export class PokemonController {
  constructor(
    private readonly _res: Response,
    private readonly _PokemonApi: PokemonApi
  ) {}

  async getAll(): Promise<void> {
    const result = await this._PokemonApi.getAll()

    if (result.isError) {
      this._res.status(400).send(result)
      return
    }

    this._res.status(201).send(result)
  }

  async getOne(id: string | number): Promise<void> {
    const result = await this._PokemonApi.getOne(id)

    if (result.isError) {
      this._res.status(400).send(result)
      return
    }

    this._res.status(201).send(result)
  }

  async getEvolution(id: string | number): Promise<void> {
    const result = await this._PokemonApi.getEvolutions(id)

    if (result.isError) {
      this._res.status(400).send(result)
      return
    }

    this._res.status(201).send(result)
  }
}
