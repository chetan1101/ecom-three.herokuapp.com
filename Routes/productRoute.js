const express = require("express");
const Product = require('../Models/productModel');
const asyncHandler = require('express-async-handler');
const router = express.Router();

//create new product
router.post('/', asyncHandler(async (req, res) => {
    const product = new Product({
        name: req.body.name,
        img: req.body.img,
        price: req.body.price,
        countInStock: req.body.countInStock,
        brand: req.body.brand,
        description: req.body.description,
    });
    if (product) {
        const newProduct = await product.save();
        res.status(201).send({ massage: "New proudct is created successfully.", newProduct: newProduct })
    } else {
        res.send({ massage: "Error in creating product." })
    }
}));

//Get product list
router.get('/', asyncHandler(async (req, res) => {
    const proudcts = await Product.find({});
    if (proudcts) {
        res.status(200).send({ massage: "Productlist successfully loaded.", productList: proudcts });
    } else {
        res.status(404).send({ massage: "Productlist not found." })
    }
}));

//Get product
router.get('/:id', asyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (Product) {
        res.status(200).send({ massage: `${productId} is fatched successfully.`, product: product })
    } else {
        res.status(404).send({ massage: "Product not found." })
    }
}))

module.exports = router;


