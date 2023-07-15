export const pokemonEvolutionUrl = (evolutionChain: string): string => {
  const url = evolutionChain.slice(42 - evolutionChain.length)
  const pokemonUrl = url.slice(0, -1)

  return pokemonUrl
}
