const express = require("express");
const router = express.Router();
const Order = require("../model/order");
const User = require("../model/user");
const Product = require("../model/product");

router.post("/my-order", async (req, res) => {
    try {
        const { email, productIds,quantity, addressId, totalPrice } = req.body;

        if (!email || !productIds|| !addressId || !totalPrice || !quantity) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: "User not found" });
        const orderedProducts = productIds.map((id, index) => ({
            productId: id,
            quantity: quantity[index]
        }));
        const newOrder = new Order({
            userId: user._id,
           products:orderedProducts,
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

router.get('/myOrder',async(req,res)=>{
    try{
        const email = req.query
        if(!email)
            res.status(400).json({message:'login to view the order'})
        const myOrder= await Order.find({})
           res.status(201).json({myOrder})
    }catch(e){
res.status(500).json({msg:e})
    }
})
module.exports = router;
