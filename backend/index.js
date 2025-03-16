const express = require("express");
const cors = require("cors");
const mongoDB = require("./db");

const app = express();
const port = process.env.PORT || 5000;

// 🔗 Connect to MongoDB
mongoDB();

// ✅ Middleware
app.use(cors());
app.use(express.json()); // Parse JSON

// ✅ Include API Routes (Make sure this line is present)
app.use("/api", require("./Routes/DisplayData")); // This must be included!
app.use("/api", require("./Routes/CreateUser")); // Ensure this exists
app.use("/api", require("./Routes/CreateUser")); // This ensures the route is loaded


// ✅ Default Route
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// ✅ Start Server
app.listen(port, () => {
    console.log(`✅ Server is running on port ${port}`);
});