import express from "express";
import { getCart, cartItems } from "../controllers/cartController.js";
import { authMiddleware } from "../middleware/auth.js";
const cartRouter = express.Router();

cartRouter.post("/cart-items", authMiddleware, cartItems);
cartRouter.post("/get", authMiddleware, getCart);

export default cartRouter;
