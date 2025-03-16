const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Make sure this is correct

const JWT_SECRET = "your_secret_key"; // Change this to a strong secret

// ✅ Login Route
router.post("/loginuser", async(req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });

        res.json({ success: true, token });

    } catch (error) {
        console.error("❌ Error logging in:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;