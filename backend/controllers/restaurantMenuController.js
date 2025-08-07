import MenuItem from "../models/MenuItem.js";

// Get all menu items for a specific restaurant
export const getMenuByRestaurant = async(req, res) => {
    const { restaurantId } = req.params;
    try {
        const menuItems = await MenuItem.find({ restaurant: restaurantId });
        res.status(200).json(menuItems);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch restaurant menu", details: err.message });
    }
};