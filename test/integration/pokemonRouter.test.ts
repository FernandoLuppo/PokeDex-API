import supertest from "supertest"
import { app } from "../../src/app"
import { mockReq } from "../unitary/mock"
import { mockTokens } from "./mocks"

describe("pokemonRouter.ts", () => {
  describe("get-all", () => {
    it("Should get some pokemons", async () => {
      const response = await supertest(app).get("/pokemon/get-all")

      expect(response.status).toBe(200)
      expect(response.body.message).toBe(
        "List of pokemons uploaded successfully"
      )
      expect(response.body.isError).toBe(false)
      expect(response.body.data).toBeDefined()
      expect(response.body.data.length).toBeGreaterThan(10)
      expect(response.body.data[0]).toHaveProperty("type")
      expect(response.body.data[0]).toHaveProperty("name")
      expect(response.body.data[0]).toHaveProperty("id")
      expect(response.body.data[0]).toHaveProperty("sprit")
    })
  })

  describe("get-one", () => {
    it("Should get just one pokemon", async () => {
      const req = mockReq({ pokemonId: 1 })
      const response = await supertest(app)
        .post("/pokemon/get-one")
        .send(req.body)

      expect(response.status).toBe(200)
      expect(response.body.message).toBe("Pokemon uploaded successfully")
      expect(response.body.isError).toBe(false)
      expect(response.body.data).toBeDefined()
      expect(response.body.data).toHaveProperty("pokemonMovie")
      expect(response.body.data).toHaveProperty("pokemonStats")
      expect(response.body.data).toHaveProperty("types")
      expect(response.body.data).toHaveProperty("genericInfos")
      expect(response.body.data).toHaveProperty("levels")
      expect(response.body.data).toHaveProperty("description")
    })
  })

  describe("get-evolution", () => {
    it("Should get just one pokemon", async () => {
      const req = mockReq({ pokemonId: 1 })
      const response = await supertest(app)
        .post("/pokemon/get-evolution")
        .send(req.body)

      expect(response.status).toBe(200)
      expect(response.body.message).toBe(
        "Pokemon Evolution Chain uploaded successfully"
      )
      expect(response.body.isError).toBe(false)
      expect(response.body.data).toBeDefined()
      expect(response.body.data).toHaveProperty("types")
      expect(response.body.data).toHaveProperty("genericInfos")
      expect(response.body.data).toHaveProperty("levels")
    })
  })

  describe("add", () => {
    it("Should add a pokemon in user team", async () => {
      const req = mockReq({ pokemonId: 1 })
      await supertest(app).post("/user/register").send(req.body)
      await supertest(app).post("/user/login").send(req.body)

      const { cookiesAccessTokenValidValue, cookiesRefreshTokenValidValue } =
        await mockTokens()

      const response = await supertest(app)
        .put("/pokemon/add")
        .send(req.body)
        .set(
          "Cookie",
          `${cookiesAccessTokenValidValue}; ${cookiesRefreshTokenValidValue}`
        )

      expect(response.status).toBe(200)
      expect(response.body.message).toBe("Pokemon added to team")
      expect(response.body.isError).toBe(false)
      expect(response.body.data.message).toBe("Team uploaded successfully")
      expect(response.body.data.isError).toBe(false)
      expect(response.body.data.data).toBeDefined()
    })

    it("Should return a error when user tyr to add a pokemon in he's team", async () => {
      const req = mockReq(null)
      await supertest(app).post("/user/register").send(req.body)
      await supertest(app).post("/user/login").send(req.body)

      const { cookiesAccessTokenValidValue, cookiesRefreshTokenValidValue } =
        await mockTokens()

      const response = await supertest(app)
        .put("/pokemon/add")
        .send(req.body)
        .set(
          "Cookie",
          `${cookiesAccessTokenValidValue}; ${cookiesRefreshTokenValidValue}`
        )

      expect(response.status).toBe(401)
      expect(response.body.isError).toBe(true)
      expect(response.body.error).toBeDefined()
      expect(response.body.error.length).toBeGreaterThan(0)
    })
  })

  describe("team", () => {
    it("Should get the user pokemon team", async () => {
      const req = mockReq({ pokemonId: 1 })
      await supertest(app).post("/user/register").send(req.body)
      await supertest(app).post("/user/login").send(req.body)

      const { cookiesAccessTokenValidValue, cookiesRefreshTokenValidValue } =
        await mockTokens()

      await supertest(app)
        .put("/pokemon/add")
        .send(req.body)
        .set(
          "Cookie",
          `${cookiesAccessTokenValidValue}; ${cookiesRefreshTokenValidValue}`
        )

      const response = await supertest(app)
        .get("/pokemon/team")
        .set(
          "Cookie",
          `${cookiesAccessTokenValidValue}; ${cookiesRefreshTokenValidValue}`
        )

      expect(response.status).toBe(200)
      expect(response.body.message).toBe("Team uploaded successfully")
      expect(response.body.isError).toBe(false)
      expect(response.body.data).toBeDefined()
    })

    it("Should return a error when try to get the user's pokemon team", async () => {
      const req = mockReq({ pokemonId: 1 })
      await supertest(app).post("/user/register").send(req.body)
      await supertest(app).post("/user/login").send(req.body)

      const { cookiesAccessTokenValidValue, cookiesRefreshTokenValidValue } =
        await mockTokens()

      await supertest(app)
        .put("/pokemon/add")
        .send(req.body)
        .set(
          "Cookie",
          `${cookiesAccessTokenValidValue}; ${cookiesRefreshTokenValidValue}`
        )

      const response = await supertest(app).get("/pokemon/team")

      expect(response.status).toBe(401)
      expect(response.body.error).toBe("jwt must be provided")
      expect(response.body.isError).toBe(true)
    })
  })

  describe("remove", () => {
    it("Should remove a pokemon from user team", async () => {
      const req = mockReq({ pokemonId: 1 })
      await supertest(app).post("/user/register").send(req.body)
      await supertest(app).post("/user/login").send(req.body)

      const { cookiesAccessTokenValidValue, cookiesRefreshTokenValidValue } =
        await mockTokens()

      await supertest(app)
        .put("/pokemon/add")
        .send(req.body)
        .set(
          "Cookie",
          `${cookiesAccessTokenValidValue}; ${cookiesRefreshTokenValidValue}`
        )

      const response = await supertest(app)
        .delete("/pokemon/remove")
        .send(req.body)
        .set(
          "Cookie",
          `${cookiesAccessTokenValidValue}; ${cookiesRefreshTokenValidValue}`
        )

      expect(response.status).toBe(200)
      expect(response.body.message).toBe("Pokemon removed from team")
      expect(response.body.isError).toBe(false)
      expect(response.body.data.message).toBe("Team uploaded successfully")
      expect(response.body.data.isError).toBe(false)
      expect(response.body.data.data).toBeDefined()
    })

    it("Should return a error when user try to remove a pokemon from he's team", async () => {
      const req = mockReq({ pokemonId: 1 })
      await supertest(app).post("/user/register").send(req.body)
      await supertest(app).post("/user/login").send(req.body)

      const { cookiesAccessTokenValidValue, cookiesRefreshTokenValidValue } =
        await mockTokens()

      const response = await supertest(app)
        .delete("/pokemon/remove")
        .send(req.body)
        .set(
          "Cookie",
          `${cookiesAccessTokenValidValue}; ${cookiesRefreshTokenValidValue}`
        )

      expect(response.status).toBe(400)
      expect(response.body.isError).toBe(true)
      expect(response.body.error).toBe("This pokemon is not part of your team")
    })
  })
})
