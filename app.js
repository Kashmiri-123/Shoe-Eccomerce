var express = require('express');

const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");

//routers
const authRoutes = require('./routes/Users');
const productRoutes = require('./routes/Product');
const categoryRoutes = require('./routes/Category');
const orderRoutes = require('./routes/Order');
const cartRoutes = require('./routes/Cart');
const wishlistRoutes = require('./routes/Wishlist');
const addressRoutes = require('./routes/Address');
// const paymentRoutes = require('./routes/Payment');

const app = express();


 //middlewares
 app.use(bodyParser.json());//Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
 app.use(cookieParser());//deleting/adding values to cookies
 app.use(cors());//for requesting from 3rd party domains

 app.use("/api", authRoutes);
 app.use("/api", productRoutes);
 app.use("/api", categoryRoutes);
 app.use("/api", orderRoutes);
 app.use("/api", cartRoutes);
 app.use("/api", wishlistRoutes);
 app.use("/api", addressRoutes);
//  app.use("/api", paymentRoutes);

 app.get("/", (req, res) => {
    res.send(`
        <h3>Hello, its working!!!</h3>
    `)
 })

 
//starting a server
app.listen(8000, () => {
    console.log(`App is running 8000`)
})