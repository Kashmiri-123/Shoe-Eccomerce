var express = require('express');

const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");

//routers
const authRoutes = require('./routes/Users');

const app = express();


 //middlewares
 app.use(bodyParser.json());//Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
 app.use(cookieParser());//deleting/adding values to cookies
 app.use(cors());//for requesting from 3rd party domains

 app.use("/api", authRoutes)

 app.get("/", (req, res) => {
    res.send(`
        <h3>Hello, its working!!!</h3>
    `)
 })

 
//starting a server
app.listen(8000, () => {
    console.log(`App is running 8000`)
})