// frontend/lib/api.js
export async function fetchRestaurants() {
    const res = await fetch("http://localhost:5000/api/restaurants");
    if (!res.ok) throw new Error("Failed to fetch restaurants");
    return res.json();
}

export async function fetchMenuByRestaurantId(id) {
    const res = await fetch(`http://localhost:5000/api/restaurant-menu/${id}`);
    if (!res.ok) throw new Error("Failed to fetch menu");
    return res.json();
}