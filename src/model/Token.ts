import { Schema, model } from "mongoose"

const RefreshToken = new Schema({
    refreshToken: {
        type: String,
        require: true
    },

    expireDat: {
        type: Date,
        require: true
    },

    userToken: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }
})

export default model("refreshTokens", RefreshToken)
