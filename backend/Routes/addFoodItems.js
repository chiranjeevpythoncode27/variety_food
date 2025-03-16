const express = require("express");
const router = express.Router();
const FoodItem = require("../models/FoodItem"); // Import model

router.post("/addfooditem", async(req, res) => {
    try {
        const { name, description, price, category, imageUrl } = req.body;

        const newItem = new FoodItem({
            name,
            description,
            price,
            category,
            imageUrl
        });

        await newItem.save();
        res.json({ success: true, message: "Food item added successfully!" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Failed to add food item." });
    }
});

module.exports = router;