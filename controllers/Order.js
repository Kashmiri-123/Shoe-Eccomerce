const Order = require('../models/Order');
const Product = require('../models/Product');
const uuidv1 = require("uuidv1");
const sequelize = require('../database/index');
const User = require('../models/Users');
const razorpayInstance = require('./payment');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY);

Order.belongsTo(Product, {foreignKey: 'product'})
Product.hasMany(Order, {foreignKey: 'product'})

Order.belongsTo(User, {foreignKey: 'buyer'})
User.hasMany(Order, {foreignKey: 'buyer'})

exports.OrderController = {
    addOrder: function(req,res){
        const order = new Order(req.body);
        const email = req.body.email;
        order.id = uuidv1();
        order.save()
            .then(savedOrder => {
                const msg = {
                    to: email, // Change to your recipient
                    from: 'kashmiri.mahanta@mtxb2b.com', // Change to your verified sender
                    subject: 'Welcome to ShoeStore',
                    text: 'Hello, thankyou for ordering from ShoeStore.',
                    html: 'Hello , thankyou for ordering from ShoeStore. Your order will be delivered by '+ savedOrder.deliveryDate +' at your doorstep. You can view your order in the Orders section.<br/><br/><strong>We are happy to serve you.</strong><br><br> Thankyou, <br>ShoeStore',
                  }
                  sgMail
                    .send(msg)
                    .then(() => {
                      return res.status(200).json(savedOrder)
                    })
                    .catch((error) => {
                      console.error("error>>>>>77>>")
                      return res.status(401).json(error);
                    })
            }).catch(error => {
                console.error("error>>>>99>>>", error)
                return res.status(401).json(error);
            })
    },

    addOrders: async function(req, res){
        var options = {
            amount: req.body.totaPrice * 100, // amount in the smallest currency unit
            currency: "INR",
            receipt: "kmonimahanta@gmail.com",
            payment_capture: '0'
        };
        razorpayInstance.instance.orders.create(options, function(error, order) {
                    if(error){
                        console.log(error);
                        res.status(417).json({
                            message: error.message,
                            payload: null
                        });
                    }
                    else{
                        const orders = new Order(req.body);
                        // orders.id = uuidv1();
                        orders.id = order;
                        orders.save()
                            .then(savedOrder => {
                                return res.status(200).json({
                                    // product: savedOrder,
                                    payload:{
                                        savedOrder,
                                        key: razorpayInstance.config.key_id
                                    },
                                    razorOrder:order
                                })
                            }).catch(error => {
                                return res.status(401).json(error);
                            })
                    }
                  });
    },

    getAllOrders: function(req,res){
        Order.findAll({
            include: [Product, User],
            raw: true})
            .then(order => {
                return res.status(200).json({order: order});
            }).catch(error => {
                return res.status(401).json(error);
            })
    },

    updateOrder: async function(req, res){
        const id = req.params.id;
        const order = await Order.findByPk(id);
        if(order === null){
            return res.status(401).json("Order not found");
        }
        else{
           order.set(req.body);
           order.save()
           .then(updatedOrder => {
               return res.status(200).json(updatedOrder)
           }).catch(error => {
               return res.status(401).json(error)
           })
        }
    },

    getOrderById: async function(req, res){
        const id = req.params.id;
    
        const order = await Order.findByPk(id);
        if(order === null){
            return res.status(401).json("Order not found");
        }
        else{
            return res.status(200).json({order: order});
        }
    },

    getOrdersByUserId: function(req, res){
        Order.findAll({
            where: {
                buyer: req.params.userId,
            },
            include: Product,
            raw: true
        })
        .then(orders => {
            return res.status(200).json(orders);
        }).catch(error => {
            return res.status(401).json(error);
        })
    }
}
