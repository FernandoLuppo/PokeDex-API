export const mockPokemonUrl = (): void => {
  jest.mock("axios", () => ({
    create: () => ({
      baseUrl: jest.fn(() => ({
        get: jest.fn(async (url: string) => {
          if (url === "/pokemon") {
            return await Promise.resolve({ data: {} })
          } else if (url.startsWith("/pokemon/")) {
            return await Promise.resolve({ data: {} })
          } else if (url.startsWith("/pokemon-species/")) {
            return await Promise.resolve({ data: {} })
          } else if (url.startsWith("/evolution-chain/")) {
            return await Promise.resolve({ data: {} })
          }
          return await Promise.reject(new Error("Invalid URL"))
        })
      }))
    })
  }))
}
