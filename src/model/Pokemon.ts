import { Schema, model } from "mongoose"

const Pokemon = new Schema({
    pokeId: {
        type: [Number],
        require: true
    },

    pokemonTrainer: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }
})

export default model("pokemons", Pokemon)
