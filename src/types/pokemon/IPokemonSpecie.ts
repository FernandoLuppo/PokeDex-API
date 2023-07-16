export interface IPokemonSpecies {
  flavor_text_entries: [
    {
      version: {
        name: string
      }
      language: {
        name: string
      }
      flavor_text: string
    }
  ]
  evolution_chain: {
    url: string
  }
}

export interface IGetSpeciesInfos {
  description: string
  evolutionChain: string
}
