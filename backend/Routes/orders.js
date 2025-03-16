const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Cart = require("../models/Cart"); // ✅ Ensure correct model import

// ✅ Get User Orders
router.get("/orders", fetchUser, async(req, res) => {
    try {
        const orders = await Cart.find({ userId: req.user.id });
        res.json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;