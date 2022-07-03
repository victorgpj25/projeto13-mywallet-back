import express from "express"
import dotenv from "dotenv"

import router from "./routes/index.js"

dotenv.config()

const server = express()
server.use(express.json())
server.use(router)


server.listen(5000)