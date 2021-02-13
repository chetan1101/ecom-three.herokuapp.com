const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const Port = process.env.PORT;
const productRouter = require('./Routes/productRoute');
const userRouter = require('./Routes/userRoute');
const orderRouter = require('./Routes/orderRoute');

app.use(bodyParser.json());
app.use(cors());
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);


app.get('/', (req, res)=> {
    res.send("server is ready");
});

require('./db');
app.listen(Port, () => console.log(`server is running on port ${Port}`));