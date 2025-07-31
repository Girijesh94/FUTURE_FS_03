import Order from "../models/Order.js";

// Place an order
export const placeOrder = async(req, res) => {
    const { userId, items, totalAmount } = req.body;
    try {
        const order = new Order({ userId, items, totalAmount });
        await order.save();
        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ message: "Failed to place order", error: err.message });
    }
};

// Get orders of a user
export const getOrders = async(req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId }).populate("items.productId");
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch orders", error: err.message });
    }
};

// Update order status (Admin use)
export const updateOrderStatus = async(req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.orderId, { status: req.body.status }, { new: true }
        );
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({ message: "Failed to update order", error: err.message });
    }
};