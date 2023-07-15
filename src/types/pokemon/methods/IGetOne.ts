import type {
  IPokemonBaseStatus,
  IPokemonMovies,
  IPokemonTypes
} from "../IPokemon"
import type { IGetEvolutionChain } from "../IPokemonEvolutionChain"

export interface IGetOne {
  pokemonMovie: IPokemonMovies[]
  pokemonStats: IPokemonBaseStatus[]
  types: IPokemonTypes[]
  genericInfos: {
    id: number
    name: string
    height: number
    weight: number
    sprit: string
  }
  levels: IGetEvolutionChain
  description: string
}
