import type { IPokemonTypes } from "../IPokemon"

export interface IGetAll {
  pokemonHome: IPokemonHome[]
}

interface IPokemonHome {
  type: IPokemonTypes[]
  name: string
  id: number
  sprit: string
}
