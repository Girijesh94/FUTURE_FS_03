import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: [orderItemSchema],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ["Pending", "Shipped", "Delivered"], default: "Pending" },
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);