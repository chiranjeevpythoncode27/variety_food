const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to verify JWT token
const authenticateUser = async(req, res, next) => {
    let token = req.headers.authorization;

    if (token && token.startsWith("Bearer")) {
        try {
            token = token.split(" ")[1]; // Extract token
            const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token

            req.user = await User.findById(decoded.id).select("-password"); // Attach user data to request
            if (!req.user) {
                return res.status(401).json({ error: "User not found" });
            }

            next(); // Proceed to route handler
        } catch (error) {
            return res.status(401).json({ error: "Not authorized, invalid token" });
        }
    } else {
        return res.status(401).json({ error: "Not authorized, no token provided" });
    }
};

// Protected route: Fetch user data
router.get("/user", authenticateUser, async(req, res) => {
    try {
        res.json(req.user); // Send user data
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch user data" });
    }
});

module.exports = router;