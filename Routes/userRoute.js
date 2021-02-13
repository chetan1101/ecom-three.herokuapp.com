const express = require("express");
const router = express.Router();
const User = require("../Models/userModel");
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const { getToken, isAuth } = require("../utils");


router.post('/register', asyncHandler(async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        password: bcrypt.hashSync(req.body.password, 8) // 8 for node versions
    });
    const newUser = await user.save();
    if (newUser) {
        res.status(201).send({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            mobile: newUser.mobile,
            isAdmin: newUser.isAdmin,
            token: getToken(newUser)
        });
    } else {
        res.status(500), send({ massage: "User is already exist" })
    }
}))

router.post('/login', asyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            res.status(200).send({
                _id: user._id,
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                isAdmin: user.isAdmin,
                token: getToken(user)
            })
            return;
        }
    }
    res.status(401).send({ massage: "Invalid username or password." })
}))

router.put('/profile', isAuth, asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.mobile = req.body.mobile || user.mobile;
        if (req.body.password) {
            user.password = bcrypt.hashSync(req.body.password, 8);
        }
        const updatedUser = await user.save();
        res.status(200).send({ updatedUser : {
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            mobile: updatedUser.mobile,
            isAdmin: updatedUser.isAdmin,
            token: getToken(updatedUser)
        }, massage: "Profile updated successfully."
        })
    }

}))

module.exports = router;