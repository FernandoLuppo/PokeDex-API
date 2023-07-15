import type {
  IGetAll,
  IGetEvolution,
  IGetEvolutionChain,
  IGetOne,
  IGetPokemonInfos,
  IGetSpeciesInfos,
  IPokemon,
  IPokemonBaseStatus,
  IPokemonEvolutionChain,
  IPokemonMovies,
  IPokemonSpecies,
  IPokemonTypes
} from "../../types"
import { pokemonEvolutionUrl } from "../../utils"
import type { PokemonUrl } from "./PokemonUrl"

export class PokemonApi {
  constructor(private readonly _PokemonUrl: PokemonUrl) {}

  async getAll(): Promise<IGetAll> {
    const { data } = await this._PokemonUrl.getAll()
    const pokemonHome = []

    for (const { name } of data.results) {
      const dataPokemon = await this._PokemonUrl.getOne(name)
      const { types, genericInfos } = await this._getPokemonInfos(dataPokemon)

      pokemonHome.push({
        type: types,
        name: genericInfos.name,
        id: genericInfos.id,
        sprit: genericInfos.sprit
      })
    }
    return { pokemonHome }
  }

  async getOne(id: number | string): Promise<IGetOne> {
    const dataPokemon = await this._PokemonUrl.getOne(id)
    const dataSpecie = await this._PokemonUrl.getSpecie(id)

    const { pokemonMovie, pokemonStats, types, genericInfos } =
      await this._getPokemonInfos(dataPokemon)

    const { description, evolutionChain } = await this._getSpeciesInfos(
      dataSpecie
    )

    const pokemonUrl = pokemonEvolutionUrl(evolutionChain)

    const dataEvolution = await this._PokemonUrl.getEvolutionChain(pokemonUrl)
    const { levels } = await this._getEvolutionChain(dataEvolution)

    return {
      pokemonMovie,
      pokemonStats,
      types,
      genericInfos,
      levels,
      description
    }
  }

  async getEvolutions(id: number | string): Promise<IGetEvolution> {
    const dataPokemon = await this._PokemonUrl.getOne(id)
    const dataSpecie = await this._PokemonUrl.getSpecie(id)

    const { types, genericInfos } = await this._getPokemonInfos(dataPokemon)

    const { evolutionChain } = await this._getSpeciesInfos(dataSpecie)

    const pokemonUrl = pokemonEvolutionUrl(evolutionChain)

    const dataEvolution = await this._PokemonUrl.getEvolutionChain(pokemonUrl)
    const { levels } = await this._getEvolutionChain(dataEvolution)

    return { types, genericInfos, levels }
  }

  private async _getPokemonInfos({
    data
  }: IPokemon): Promise<IGetPokemonInfos> {
    const pokemonMovie: IPokemonMovies[] = []
    const pokemonStats: IPokemonBaseStatus[] = []
    const types: IPokemonTypes[] = []

    const genericInfos = {
      id: data.id,
      name: data.name,
      height: data.height,
      weight: data.weight,
      sprit:
        data.sprites.versions["generation-v"]["black-white"].animated
          .front_default
    }

    data.moves.forEach(movie => {
      movie.version_group_details.forEach(group => {
        if (group.version_group.name === "ultra-sun-ultra-moon") {
          if (group.move_learn_method.name === "level-up") {
            pokemonMovie.push({
              movie: movie.move.name,
              level: group.level_learned_at
            })
          }
        }
      })
    })

    data.stats.forEach(stats => {
      pokemonStats.push({
        base_stat: stats.base_stat,
        name: stats.stat.name
      })
    })

    data.types.forEach(type => {
      types.push({
        type: type.type.name
      })
    })

    return { pokemonMovie, pokemonStats, types, genericInfos }
  }

  private async _getSpeciesInfos({
    data
  }: IPokemonSpecies): Promise<IGetSpeciesInfos> {
    let description: string = ""
    const evolutionChain = data.evolution_chain.url

    data.flavor_text_entries.forEach(text => {
      if (text.version.name === "shield" && text.language.name === "en") {
        description = text.flavor_text
        return description
      }
    })

    return { description, evolutionChain }
  }

  private async _getEvolutionChain({
    data
  }: IPokemonEvolutionChain): Promise<{ levels: IGetEvolutionChain }> {
    let levels: IGetEvolutionChain = {
      firstForm: {
        name: data.chain.species.name
      }
    }

    data.chain.evolves_to.forEach(level => {
      levels = {
        firstForm: {
          name: data.chain.species.name
        },
        secondForm: {
          name: level.species.name,
          level: level.evolution_details[0]?.min_level,
          evolveBy: level.evolution_details[0]?.trigger.name
        },
        thirdForm: {
          name: level.evolves_to[0]?.species.name,
          level: level.evolves_to[0]?.evolution_details[0]?.min_level,
          evolveBy: level.evolves_to[0]?.evolution_details[0]?.trigger.name
        }
      }
    })

    return { levels }
  }
}
