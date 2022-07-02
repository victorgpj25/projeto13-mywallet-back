import express from "express"
import { solicitarDados, adicionarDados } from "../controllers/walletController.js"

const walletRouter = express.Router()
walletRouter.get("/carteiraDados", verificarToken, solicitarDados)
walletRouter.post("/carteiraDados", verificarToken, adicionarDados)
export default walletRouter