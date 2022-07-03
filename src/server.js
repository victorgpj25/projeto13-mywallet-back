import express from "express"
import dotenv from "dotenv"
import cors from "cors"

import router from "./routes/index.js"

const server = express()
server.use(cors())
dotenv.config()


server.use(express.json())
server.use(router)



server.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
});