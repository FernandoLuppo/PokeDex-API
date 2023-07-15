import { Router } from "express"
import type { Request, Response } from "express"
import { PokemonController, TrainerController } from "../../controller/pokemon"
import { PokemonApi, PokemonUrl, PokemonUser } from "../../service"
import { TokenAuthenticate } from "../../middleware"

const pokemonRouter = Router()
const pokemonUrl = new PokemonUrl()
const tokenAuthenticate = new TokenAuthenticate()

pokemonRouter.get("/get-all", async (req: Request, res: Response) => {
  const pokemonApi = new PokemonApi(pokemonUrl)
  await new PokemonController(res, pokemonApi).getAll()
})

pokemonRouter.post("/get-one", async (req: Request, res: Response) => {
  const pokemonApi = new PokemonApi(pokemonUrl)
  await new PokemonController(res, pokemonApi).getOne(req.body.id)
})

pokemonRouter.post("/get-evolution", async (req: Request, res: Response) => {
  const pokemonApi = new PokemonApi(pokemonUrl)
  await new PokemonController(res, pokemonApi).getEvolution(req.body.id)
})

pokemonRouter.get(
  "/team",
  tokenAuthenticate.accessTokenAuthenticate,
  async (req: Request, res: Response) => {
    const pokemonApi = new PokemonApi(pokemonUrl)
    const pokemonUser = new PokemonUser(req, pokemonApi)
    await new TrainerController(res, pokemonUser).userTeam()
  }
)

pokemonRouter.put(
  "/add",
  tokenAuthenticate.accessTokenAuthenticate,
  async (req: Request, res: Response) => {
    const pokemonApi = new PokemonApi(pokemonUrl)
    const pokemonUser = new PokemonUser(req, pokemonApi)
    await new TrainerController(res, pokemonUser).addPokemon()
  }
)

pokemonRouter.delete(
  "/remove",
  tokenAuthenticate.accessTokenAuthenticate,
  async (req: Request, res: Response) => {
    const pokemonApi = new PokemonApi(pokemonUrl)
    const pokemonUser = new PokemonUser(req, pokemonApi)
    await new TrainerController(res, pokemonUser).removePokemon()
  }
)

export { pokemonRouter }
