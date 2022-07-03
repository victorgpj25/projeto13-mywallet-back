import express from "express"
import dotenv from "dotenv"
import cors from "cors"

import router from "./routes/index.js"

dotenv.config()

const server = express()
server.use(express.json())
server.use(router)
server.use(cors())


server.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
});