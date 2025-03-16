const express = require("express");
const cors = require("cors");
const mongoDB = require("./db");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// ✅ Connect to MongoDB
mongoDB();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ API Routes
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/CreateUser"));
app.use("/api/payment", require("./Routes/paymentRoutes")); // ✅ Add this line!

// ✅ Default Route
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// ✅ Start Server
app.listen(port, () => {
    console.log(`✅ Server is running on port ${port}`);
});