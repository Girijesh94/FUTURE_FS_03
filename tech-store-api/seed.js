// seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import { faker } from "@faker-js/faker";
import Product from "./models/Product.js";
import connectDB from "./config/db.js";

dotenv.config();
await connectDB();

const seedProducts = async() => {
    try {
        await Product.deleteMany();

        const foodCategories = [
            "Main Course",
            "Snacks",
            "Desserts",
            "Beverages",
            "South Indian",
            "North Indian",
            "Chinese",
            "Fast Food",
        ];

        const dummyProducts = Array.from({ length: 50 }).map(() => ({
            name: faker.commerce.productName() + " " + faker.animal.type(),
            description: faker.commerce.productDescription(),
            category: faker.helpers.arrayElement(foodCategories),
            price: parseFloat(faker.commerce.price({ min: 80, max: 350 })),
            restaurant: faker.company.name(),
            rating: faker.number.float({ min: 3.5, max: 5, precision: 0.1 }),
            image: faker.image.urlLoremFlickr({ category: 'food' }),
            stockQuantity: faker.number.int({ min: 10, max: 100 }),
        }));

        await Product.insertMany(dummyProducts);
        console.log("✅ Swiggy-style food items seeded!");
        process.exit();
    } catch (error) {
        console.error("❌ Error seeding products:", error);
        process.exit(1);
    }
};

seedProducts();