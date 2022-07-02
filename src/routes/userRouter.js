import express from "express"
import { logar, cadastrar } from "../controllers/userController.js"

const userRouter = express.Router()
userRouter.post("/login", logar)
userRouter.post("/cadastro", cadastrar)
export default userRouter