import express from "express"
import { solicitarDados, adicionarDados } from "../controllers/walletController.js"
import db from "../databases/mongo.js";


async function verificaToken(req, res, next) {
    const authorization = req.headers.authorization;
    const token = authorization?.replace("Bearer ", "");
  
      if (!token) {
      return res.sendStatus(401);
      }
  
    const session = await db.collection("sessions").findOne({ token });
  
    if (!session) {
      return res.sendStatus(401);
    }

    const user = await db.collection("users").findOne({ 
		_id: session.userId 
	});
	if (!user) {
	  return res.sendStatus(401);
	}
	delete user.password;

	res.locals.userId = user._id;
  
    next();
  }


const walletRouter = express.Router()
walletRouter.get("/carteiraDados", verificaToken, solicitarDados)
walletRouter.post("/carteiraDados", verificaToken, adicionarDados)
export default walletRouter