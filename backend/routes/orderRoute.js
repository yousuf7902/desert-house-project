import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import {
    onlinePayment,
    orderById,
    paymentSuccess,
    placeOrder,
    userOrders,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/placeorder", authMiddleware, placeOrder);
orderRouter.post("/online-payment", authMiddleware, onlinePayment);
orderRouter.post("/payment/success/:tranId", paymentSuccess);
orderRouter.get("/user-orders", authMiddleware, userOrders);
orderRouter.get("/:id", authMiddleware, orderById);


export default orderRouter;
