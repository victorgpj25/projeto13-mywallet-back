import express from "express"
import { solicitarDados, adicionarDados } from "../controllers/walletController.js"

const walletRouter = express.Router()
walletRouter.get("/carteiraDados",  solicitarDados)
walletRouter.post("/carteiraDados",  adicionarDados)
export default walletRouter