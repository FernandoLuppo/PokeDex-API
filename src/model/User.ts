import { Schema, model } from "mongoose"

const User = new Schema({
  name: {
    type: String,
    require: true
  },

  email: {
    type: String,
    require: true
  },

  password: {
    type: String,
    require: true
  },

  refreshToken: {
    type: Schema.Types.ObjectId,
    ref: "refreshtokens"
  },

  pokemon: {
    type: Schema.Types.ObjectId,
    ref: "pokemons"
  }
})

export default model("users", User)
