import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import cartRoutes from "./routes/cart.js";
import orderRoutes from "./routes/orders.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // For parsing JSON request bodies

// Connect to MongoDB
connectDB();

// Route Middleware
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// Root route (optional)
app.get("/", (req, res) => {
    res.send("🚀 Tech Store API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});