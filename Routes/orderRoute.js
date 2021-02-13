const express = require('express');
const router = express.Router();
const Order = require('../Models/orderModel');
const asyncHandler = require('express-async-handler');
const { isAuth } = require('../utils');

const Razorpay = require('razorpay')

const razorpay = new Razorpay({
    key_id: process.env.RP_KEY_ID,
    key_secret: process.env.RP_KEY_SECRET
})

router.get('/myorders', isAuth, asyncHandler(async (req, res) => {
    const myOrderList = await Order.find({ user: req.user._id });
    res.send({ massage: "Orderlist fatched successfully.", myorders: myOrderList })
}))


router.post('/', isAuth, asyncHandler(async (req, res) => {
    if (req.body.orderItems.length === 0) {
        res.status(400).send({ massage: "Cart is empty." })
    } else {
        const order = new Order({
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shippingAddress,
            priceDetail: req.body.priceDetail,
            user: req.user._id
        });
        const createdOrder = await order.save();
        res.status(201).send({ massage: "New order created.", order: createdOrder })
    }
}))

router.get('/:id', isAuth, asyncHandler(async (req, res) => {
    const getOrder = await Order.findById(req.params.id);
    if (getOrder) {
        res.status(200).send({ massage: "Order fetched succesfully", order: getOrder });
    } else {
        res.status(404).send({ massage: "order not found" })
    }
}))

router.post('/rozorpay', isAuth, asyncHandler(async (req, res) => {

    const response = await razorpay.orders.create({
        amount: req.body.amount * 100,
        currency: req.body.currency
    })

    if (response) {
        res.status(200).send({
            massage: "Order fetched succesfully", response: {
                id: response.id,
                currency: response.currency,
                amount: response.amount,
                key: process.env.RP_KEY_ID,
            }
        });
    } else {
        res.status(404).send({ massage: "response not get" })
    }

}));


router.put('/:id/pay', isAuth, asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.razorpay_payment_id = req.body.razorpay_payment_id;
        order.razorpay_order_id = req.body.razorpay_order_id;
        order.razorpay_signature = req.body.razorpay_signature;
        order.isPaid = true;
        order.paidAt = Date.now();

        const updatedOrder = await order.save()
        res.send({ massage: "Payment detail saved succesfully", savePayment: updatedOrder });
    }
    else {
        res.status(404).send({ massage: "Order not found." })
    }
}))



module.exports = router;






