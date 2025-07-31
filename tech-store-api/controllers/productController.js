import Product from "../models/Product.js";

export const getAllProducts = async(req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch products", error: err.message });
    }
};

export const getProductById = async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: "Error fetching product", error: err.message });
    }
};

export const createProduct = async(req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ message: "Failed to create product", error: err.message });
    }
};

export const updateProduct = async(req, res) => {
    try {
        const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: "Failed to update product", error: err.message });
    }
};

export const deleteProduct = async(req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted" });
    } catch (err) {
        res.status(400).json({ message: "Failed to delete product", error: err.message });
    }
};