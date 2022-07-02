import express from "express";
import userRouter from "./userRouter.js";
import walletRouter from "./walletRouter.js";

const router = express.Router();
router.use(userRouter);
router.use(walletRouter);
export default router