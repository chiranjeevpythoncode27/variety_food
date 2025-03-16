const express = require("express");
const router = express.Router();

router.get("/foodData", async(req, res) => {
    try {
        console.log("Fetching food data...");

        // Ensure global variables exist
        if (!global.food_item || !global.foodCategory) {
            console.error("❌ Food data not available in global variables.");
            return res.status(500).json({ error: "Food data not loaded yet!" });
        }

        console.log("✅ Food data fetched successfully!");
        res.json({ foodItems: global.food_item, foodCategories: global.foodCategory });

    } catch (error) {
        console.error("❌ Error fetching food data:", error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;