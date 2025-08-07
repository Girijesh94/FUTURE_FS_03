import express from "express";
import { getMenuByRestaurantId } from "../controllers/restaurantMenuController.js";

const router = express.Router();

router.get("/:restaurantId", getMenuByRestaurantId);

export default router;