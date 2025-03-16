const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const FoodItem = require("../models/FoodItem"); // Import the FoodItem model

// ✅ Add a new food item to MongoDB
router.post("/addFoodItem", async (req, res) => {
    try {
        const { name, CategoryName, price, description } = req.body;

        if (!name || !CategoryName || !price || !description) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newFoodItem = new FoodItem({ name, CategoryName, price, description });
        await newFoodItem.save();

        res.status(201).json({ message: "Food item added successfully", newFoodItem });
    } catch (error) {
        console.error("Error adding food item:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
