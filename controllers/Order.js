const Order = require('../models/Order');
const Product = require('../models/Product');
const uuidv1 = require("uuidv1");
const sequelize = require('../database/index');


exports.OrderController = {
    addOrder: function(req,res){
        const order = new Order(req.body);
        order.id = uuidv1();
        order.save()
            .then(savedOrder => {
                return res.status(200).json({product: savedOrder})
            }).catch(error => {
                return res.status(401).json(error);
            })
    },

    getAllOrders: function(req,res){
        Order.findAll({raw: true})
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
    // User.findOne({
    //     where: { id: 2 },
    //     include: [{ model: Book }]
    //   }).then((user) => {
    //     user.Books.map((book) => book.dataValues);
    //     (async() => {
    //       for (let i=0;i<user.Books.length;i++) {
    //         user.Books[i].dataValues.library = await Library.findById(user.Books[i].BookUsers.library_id);
    //       }
    //     console.log(user);
    //     })();
    //   }).catch((err) => {
    //     // handle error
    //   });

    getOrdersByUserId: async function(req, res){
        Order.findAll({
            where: {
                buyer: req.params.userId,
            },
            raw: true
        })
        .then(orders => {
            return res.status(200).json(orders);
        }).catch(error => {
            return res.status(401).json(error);
        })
    }
}
