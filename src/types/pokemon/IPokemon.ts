export interface IPokemon {
  data: {
    moves: [
      {
        move: {
          name: string
        }

        version_group_details: [
          {
            level_learned_at: number
            move_learn_method: {
              name: string
            }
            version_group: {
              name: string
            }
          }
        ]
      }
    ]

    stats: [
      {
        base_stat: number
        stat: {
          name: string
        }
      }
    ]

    types: [
      {
        type: {
          name: string
        }
      }
    ]

    id: number
    name: string
    height: number
    weight: number
    sprites: {
      versions: {
        "generation-v": {
          "black-white": {
            animated: {
              front_default: string
            }
          }
        }
      }
    }
  }
}

export interface IGetPokemonInfos {
  genericInfos: {
    id: number
    name: string
    height: number
    weight: number
    sprit: string
  }
  pokemonMovie: IPokemonMovies[]
  pokemonStats: IPokemonBaseStatus[]
  types: IPokemonTypes[]
}

export interface IPokemonMovies {
  movie: string
  level: number
}

export interface IPokemonBaseStatus {
  base_stat: number
  name: string
}

export interface IPokemonTypes {
  type: string
}
