import express from "express"
import { AllOrders, placeOrder, placeOrderByCOD, updateStatus, userOrder, verifyOrder } from "../controllers/order.controller.js"
import authMiddleware from "../middleware/auth.middleware.js";

const orderRouter = express.Router()

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrder)
orderRouter.post("/userOrder", authMiddleware, userOrder)
orderRouter.get("/list", AllOrders)
orderRouter.post("/update", updateStatus)
orderRouter.post("/cod", authMiddleware, placeOrderByCOD)

export default orderRouter; 