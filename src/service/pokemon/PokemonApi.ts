import type {
  IGetEvolutionChain,
  IGetPokemonInfos,
  IGetSpeciesInfos,
  IPokemon,
  IPokemonBaseStatus,
  IPokemonEvolutionChain,
  IPokemonMovies,
  IPokemonSpecies,
  IPokemonTypes,
  IResult
} from "../../types"
import type { PokemonUrl } from "./PokemonUrl"
import { handlingErrors, isResult, pokemonEvolutionUrl } from "../../utils"

export class PokemonApi {
  constructor(private readonly _PokemonUrl: PokemonUrl) {}

  async getAll(): Promise<IResult> {
    let result: IResult = { message: "", isError: false, error: "", data: {} }
    const getAll = await this._PokemonUrl.getAll()
    const pokemonHome = []

    if (isResult(getAll).isError) {
      result = getAll
      return result
    }

    for (const { name } of getAll.data.results) {
      const dataPokemon = await this._PokemonUrl.getOne(name)
      try {
        if (isResult(dataPokemon).isError) {
          result = dataPokemon
          return result
        }
        const { types, genericInfos } = await this._getPokemonInfos(
          dataPokemon.data
        )

        pokemonHome.push({
          type: types,
          name: genericInfos.name,
          id: genericInfos.id,
          sprit: genericInfos.sprit
        })
      } catch (err) {
        return handlingErrors(err)
      }
    }

    result.message = "List of pokemons uploaded successfully"
    result.data = pokemonHome
    return result
  }

  async getOne(id: number | string): Promise<IResult> {
    let result: IResult = { message: "", isError: false, error: "", data: {} }
    const pokemon = await this._PokemonUrl.getOne(id)
    const specie = await this._PokemonUrl.getSpecie(id)

    if (isResult(pokemon).isError) {
      result = pokemon
      return result
    }
    if (isResult(specie).isError) {
      result = specie
      return result
    }

    const { pokemonMovie, pokemonStats, types, genericInfos } =
      await this._getPokemonInfos(pokemon.data)

    const { description, evolutionChain } = await this._getSpeciesInfos(
      specie.data
    )

    const pokemonUrl = pokemonEvolutionUrl(evolutionChain)
    const evolution = await this._PokemonUrl.getEvolutionChain(pokemonUrl)

    if (isResult(evolution).isError) {
      result = evolution
      return result
    }
    const { levels } = await this._getEvolutionChain(evolution.data)

    result.message = "Pokemon uploaded successfully"
    result.data = {
      pokemonMovie,
      pokemonStats,
      types,
      genericInfos,
      levels,
      description
    }
    return result
  }

  async getEvolutions(id: number | string): Promise<IResult> {
    let result: IResult = { message: "", isError: false, error: "", data: {} }
    const pokemon = await this._PokemonUrl.getOne(id)
    const specie = await this._PokemonUrl.getSpecie(id)

    if (isResult(pokemon).isError) {
      result = pokemon
      return result
    }
    if (isResult(specie).isError) {
      result = specie
      return result
    }

    const { types, genericInfos } = await this._getPokemonInfos(pokemon.data)
    const { evolutionChain } = await this._getSpeciesInfos(specie.data)

    const pokemonUrl = pokemonEvolutionUrl(evolutionChain)
    const evolution = await this._PokemonUrl.getEvolutionChain(pokemonUrl)

    if (isResult(evolution).isError) {
      result = evolution
      return result
    }
    const { levels } = await this._getEvolutionChain(evolution.data)

    result.data = { types, genericInfos, levels }
    result.message = "Pokemon Evolution Chain uploaded successfully"
    return result
  }

  private async _getPokemonInfos(data: IPokemon): Promise<IGetPokemonInfos> {
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

  private async _getSpeciesInfos(
    data: IPokemonSpecies
  ): Promise<IGetSpeciesInfos> {
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

  private async _getEvolutionChain(
    data: IPokemonEvolutionChain
  ): Promise<{ levels: IGetEvolutionChain }> {
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
