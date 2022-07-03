import express from "express"
import dotenv from "dotenv"
import cors from "cors"

import router from "./routes/index.js"

const server = express()

const corsOptions ={
    origin:'*', 
    credentials:true,            
    optionSuccessStatus:200,
}

server.use(cors(corsOptions))

dotenv.config()


server.use(express.json())
server.use(router)



server.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
});