const express = require("express");
const router = express.Router();
const Order = require("../model/order");
const User = require("../model/user");
const Product = require("../model/product");

router.post("/my-order", async (req, res) => {
    try {
        const { email, products, addressId, totalPrice } = req.body;

        if (!email || !products || !addressId || !totalPrice) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: "User not found" });

        const newOrder = new Order({
            userId: user._id,
            products,
            addressId,
            totalPrice,
        });

        await newOrder.save();
        res.status(201).json({ message: "Order placed successfully", order: newOrder });

    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ error: "Server error, please try again later" });
    }
});

module.exports = router;
