import Cart from "../models/Cart.js";

// Get cart for a user
export const getCart = async(req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId }).populate("items.productId");
        res.json(cart || { userId: req.params.userId, items: [] });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch cart", error: err.message });
    }
};

// Add or update item in cart
export const addToCart = async(req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [{ productId, quantity }] });
        } else {
            const existingItem = cart.items.find(item => item.productId.toString() === productId);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.items.push({ productId, quantity });
            }
        }
        await cart.save();
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ message: "Failed to add to cart", error: err.message });
    }
};

// Remove item from cart
export const removeFromCart = async(req, res) => {
    const { userId, productId } = req.body;
    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        await cart.save();
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ message: "Failed to remove from cart", error: err.message });
    }
};

// Clear all items in cart
export const clearCart = async(req, res) => {
    try {
        await Cart.findOneAndDelete({ userId: req.params.userId });
        res.status(200).json({ message: "Cart cleared" });
    } catch (err) {
        res.status(500).json({ message: "Failed to clear cart", error: err.message });
    }
};