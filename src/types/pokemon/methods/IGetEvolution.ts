import type { IPokemonTypes } from "../IPokemon"
import type { IGetEvolutionChain } from "../IPokemonEvolutionChain"

export interface IGetEvolution {
  types: IPokemonTypes[]
  genericInfos: {
    id: number
    name: string
    height: number
    weight: number
    sprit: string
  }
  levels: IGetEvolutionChain
}
