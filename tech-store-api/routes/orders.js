import express from "express";
import {
    placeOrder,
    getOrders,
    updateOrderStatus,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", placeOrder);
router.get("/:userId", getOrders);
router.put("/:orderId", updateOrderStatus); // for admin

export default router;