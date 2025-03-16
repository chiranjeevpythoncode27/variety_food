const express = require("express");
const Razorpay = require("razorpay");
const dotenv = require("dotenv");

dotenv.config();

const router = express.Router();

// ✅ Initialize Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});

// ✅ Create Payment Order Route
router.post("/create-order", async(req, res) => {
    try {
        const { amount } = req.body;
        const options = {
            amount: amount * 100, // Convert to paisa
            currency: "INR",
            payment_capture: 1,
        };

        const order = await razorpay.orders.create(options);
        res.json({ success: true, order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Failed to create order" });
    }
});

module.exports = router; // ✅ Make sure router is exported correctly