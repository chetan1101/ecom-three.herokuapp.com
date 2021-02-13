const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    img: { type: String, required: true },
    price: { type: String, required: true },
    countInStock: { type: Number, required: true, default: 0 },
    brand: { type: String, required: true },
    prductRatting: { type: Number, required: true, default: 0 },
    totalProductReviews: { type: Number, required: true, default: 0 },
    description: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);