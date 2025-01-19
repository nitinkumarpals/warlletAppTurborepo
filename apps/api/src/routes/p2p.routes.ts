import { Router } from "express";
import { p2pTransfer } from "../controllers/p2pTransfer";
import { isAuthenticated } from "../middleware/isAuthenticated";
export const p2pRouter = Router();
p2pRouter.post("/p2pTransfer", isAuthenticated, p2pTransfer);
