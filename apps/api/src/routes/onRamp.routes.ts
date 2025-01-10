import { Router } from "express";
import { onRampTransaction } from "../controllers/onRampTransaction";
import { isAuthenticated } from "../middleware/isAuthenticated";
export const onRampRouter = Router();
onRampRouter.post("/onRampTransactions", isAuthenticated, onRampTransaction);
