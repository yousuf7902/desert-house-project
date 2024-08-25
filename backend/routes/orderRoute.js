import express from "express";
import { adminMiddleware, authMiddleware } from "../middleware/auth.js";
import {
    allOrders,
    onlinePayment,
    orderById,
    paymentFailed,
    paymentSuccess,
    placeOrder,
    updateOrder,
    userOrders,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/placeorder", authMiddleware, placeOrder);
orderRouter.post("/online-payment", authMiddleware, onlinePayment);
orderRouter.post("/payment/success/:tranId", paymentSuccess);
orderRouter.post("/payment/failed/:tranId", paymentFailed);
orderRouter.get("/user-orders", authMiddleware, userOrders);
orderRouter.get("/allorders", allOrders);
orderRouter.get("/:id", authMiddleware, orderById);
orderRouter.put("/:id", authMiddleware, updateOrder);

export default orderRouter;
