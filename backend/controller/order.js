const express = require('express')
const mongoose = require('mongoose')
const order = require('../model/order')
const user = require('../model/user')
const router=express.Router()
const product = require('../model/product')

router.post('/my-order', async (req, res) => {
    const { email, productId,quantity } = req.body;

    try {
        
        

       
        const user = await user.findOne({ email });
        if (!user) return res.status(404).send("User not found");

      
        const product = await product.findById(productId);
        if (!product) return res.status(404).send("Product not found");
        console.log(order.item)
        if (!Array.isArray(order.item)) {
            order.item = [];
        }
        const cartIndex = order.item.findIndex(item => item.productId.toString() === productId);

        if (cartIndex !== -1) {
            
            order.item[cartIndex].quantity = quantity || 1;
        } else {
            
            order.item.push({ productId, quantity: quantity || 1 });
        }

        
        await order.save(); // ✅ Ensure the changes persist in DB
        
        return res.status(200).json({ message: "ordered successfully", myorders: order.item });

    } catch (e) {
        console.error("Error:", e);
        return res.status(500).send(e.message);
    }
});

module.exports = router