const express = require("express");
const cors = require("cors");
const mongoDB = require("./db");
const twilio = require("twilio");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// ✅ Connect to MongoDB
mongoDB();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Twilio Configuration
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } = process.env;
if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_PHONE_NUMBER) {
    console.error("❌ Twilio environment variables are missing.");
    process.exit(1);
}
const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// ✅ Route to Send WhatsApp Message
app.post("/api/send-sms", async (req, res) => {
    console.log("My api is called");
    const { phone, message } = req.body;
    console.log(phone);
    if (!phone || !message) {
        return res.status(400).json({ error: "Phone number and message are required" });
    }

    try {
        const response = await client.messages.create({
            from: "whatsapp:+14155238886", 
            to: `whatsapp:${phone}`, 
            body: message, 
        });

        console.log("✅ SMS sent successfully:", response.sid);
        res.json({ success: true, messageId: response.sid });
    } catch (error) {
        console.error("❌ Error sending SMS:", error.message);
        res.status(500).json({ error: "Failed to send SMS", details: error.message });
    }
});

// ✅ API Routes
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/CreateUser"));
app.use("/api/payment", require("./Routes/paymentRoutes"));

// ✅ Default Route
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// ✅ Start Server
app.listen(port, () => {
    console.log(`✅ Server is running on port ${port}`);
});