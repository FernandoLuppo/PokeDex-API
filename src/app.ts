import {
  userRouter,
  tokenRouter,
  pokemonRouter,
  recoverPasswordRouter
} from "./routes"
import "./types"
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import * as dotenv from "dotenv"
dotenv.config()

const app = express()
app.use(express.json())

app.use(cors())
app.use(cookieParser())

const { MONGOOSE_CONNECT } = process.env
const { NODE_ENV } = process.env

if (NODE_ENV === "development") {
  mongoose.set("strictQuery", true)
  if (MONGOOSE_CONNECT !== undefined) {
    mongoose
      .connect(MONGOOSE_CONNECT)
      .then(() => {
        console.log("MongoDB connected with successful")
      })
      .catch(error => {
        console.log(error)
      })
  }
}

app.use("/user", userRouter)
app.use("/pokemon", pokemonRouter)
app.use("/token", tokenRouter)
app.use("/recover-password", recoverPasswordRouter)

export { app }
