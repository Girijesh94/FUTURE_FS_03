import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true }, // e.g., "Paneer Biryani"
    description: { type: String },
    category: { type: String, required: true }, // e.g., "Main Course"
    price: { type: Number, required: true },
    image: { type: String }, // image URL
    restaurant: { type: String, required: true }, // e.g., "Biryani Blues"
    rating: { type: Number, default: 4.0 },
    stockQuantity: { type: Number, default: 50 },
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
export default Product;