import type { IPokemonMovies } from "../IPokemon"

export interface IUserTeam {
  pokemon: {
    pokemonMovie: IPokemonMovies[]
    pokemonStats: Array<{ base_stat: number; name: string }>
    types: Array<{ type: string }>
    genericInfos: {
      id: number
      name: string
      height: number
      weight: number
      sprit: string
    }
    levels: {
      firstForm: { name: string }
      secondForm?: { name: string; level: number; evolveBy: string }
      thirdForm?: { name: string; level: number; evolveBy: string }
    }
    description: string
  }
}
