const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
       
    },
   item: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
       
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },
      },
    ],
    totalPrice: {
        type: Number,
       
    },
    paymentInfo: {
        status: { type: String, enum: ["Pending", "Paid", "Failed"], default: "Pending" },
        transactionId: { type: String }, 
        paymentMethod: { type: String, enum: ["COD", "Card", "UPI"], required: true },
    },
    shippingAddress: {
        country: { type: String, required: true },
        city: { type: String, required: true },
        address1: { type: String, required: true },
        address2: { type: String },
        zipcode: { type: Number, required: true },
        addressType: { type: String, required: true },
    },
    orderStatus: {
        type: String,
        enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
        default: "Processing",
    },
    orderedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Order", orderSchema);
