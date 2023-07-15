import { Axios } from "../axios/Axios"
import type {
  IPokemon,
  IPokemonEvolutionChain,
  IPokemonSpecies,
  IPokemons
} from "../../types"

export class PokemonUrl {
  async getAll(): Promise<IPokemons> {
    return await new Axios().baseUrl().get("/pokemon")
  }

  async getOne(pokemon: string | number): Promise<IPokemon> {
    return await new Axios().baseUrl().get(`/pokemon/${pokemon}`)
  }

  async getSpecie(pokemon: string | number): Promise<IPokemonSpecies> {
    return await new Axios().baseUrl().get(`/pokemon-species/${pokemon}`)
  }

  async getEvolutionChain(pokemonUrl: string): Promise<IPokemonEvolutionChain> {
    return await new Axios().baseUrl().get(`/evolution-chain/${pokemonUrl}`)
  }
}
