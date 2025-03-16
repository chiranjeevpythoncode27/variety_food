router.post("/add", async(req, res) => {
    try {
        console.log("Received request:", req.body); // Log request

        let { userId, items } = req.body;

        // Validate userId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            console.log("Invalid userId:", userId);
            return res.status(400).json({ error: "Invalid userId format" });
        }
        userId = new mongoose.Types.ObjectId(userId);

        // Calculate total price
        const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

        const cart = new Cart({ userId, items, totalPrice });
        await cart.save();

        console.log("Cart saved successfully:", cart); // Log successful save
        res.status(201).json({ message: "Item added to cart", cart });

    } catch (error) {
        console.error("Error in /add API:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});