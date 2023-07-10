import mongoose from "mongoose"
import User from "../src/models/User"
import RefreshToken from "../src/models/RefreshToken"
import Pokemon from "../src/models/Pokemon"

beforeAll(async () => {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect("mongodb://localhost/PokemonTest")
  }
  await Pokemon.deleteMany({})
  await RefreshToken.deleteMany({})
  await User.deleteMany({})
})

afterAll(async () => {
  await mongoose.connection.db.dropDatabase()
  await mongoose.disconnect()
})
