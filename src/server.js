import express from "express"
import dotenv from "dotenv"
import { MongoClient } from "mongodb"
import dayjs from "dayjs"
import joi from "joi"

import router from "./routes/index.js"

dotenv.config()

const server = express()
server.use(express.json())
server.use(router)

const mongoClient = new MongoClient(process.env.MONGO_URI)
let db

mongoClient.connect().then(() => {
	db = mongoClient.db("MyWallet")
})

server.listen(5000)