const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    orderItems: [
        {
            name: { type: String, required: true },
            img: { type: String, required: true },
            qty: { type: Number, required: true },
            price: { type: Number, required: true, default: 0 },
            _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }
        },
    ],

    shippingAddress: {
        name: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true, default: "omk" },
        zip: { type: String, required: true },
        country: { type: String, required: true },
    },

    priceDetail: {
        SubtotalPrice: { type: String, required: true },
        shippingPrice: { type: String, required: true },
        discontPrice: { type: String, required: true },
        taxPrice: { type: String, required: true, default: 0 },
        totalPrice: { type: String, required: true },
    },

    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    razorpay_payment_id : {type: String},
    razorpay_order_id : {type: String},
    razorpay_signature: {type: String},
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date},
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date }
},
    {
        timestamp: true
    });

module.exports = mongoose.model("Order", orderSchema);