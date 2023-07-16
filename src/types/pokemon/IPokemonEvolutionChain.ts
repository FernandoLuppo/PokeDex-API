export interface IPokemonEvolutionChain {
  chain: {
    species: {
      name: string
    }
    evolves_to: IEvolutionLevel[]
  }
}

export interface IGetEvolutionChain {
  firstForm: {
    name: string
  }
  secondForm?: {
    name: string
    level: number
    evolveBy: string
  }
  thirdForm?: {
    name: string
    level: number
    evolveBy: string
  }
}

interface IEvolutionLevel {
  species: {
    name: string
  }
  evolves_to: IEvolutionLevel[]
  evolution_details: IEvolutionDetail[]
}

interface IEvolutionDetail {
  min_level: number
  trigger: {
    name: string
  }
}
