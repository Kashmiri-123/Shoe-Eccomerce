const Cart = require('../models/Cart');
const uuidv1 = require("uuidv1");
const { Op } = require("sequelize");

exports.CartController = {
    addCart: async function(req,res){
        const cart = new Cart(req.body);
        cart.id = uuidv1();
        const oldCart = await Cart.findAll({
            where: {
                [Op.and]: [
                    {creator: req.body.creator},
                    {product: req.body.product}
                ]
            }, raw: true
        })
        console.log(oldCart.length===0, oldCart===null)
        if(oldCart.length != 0){
            console.log(JSON.stringify(oldCart)+ ">>>>>>>")
            return res.status(200).json("Product already in cart")
        }else{
            cart.save()
            .then(savedCart => {
                return res.status(200).json(savedCart)
            }).catch(error => {
                return res.status(401).json(error);
            })
        }
    },

    getAllCartsByUserId: function(req,res){
        Cart.findAll({
            where: {
                creator: req.params.userId,
            }
        })
        .then(cart => {
            return res.status(200).json(cart);
        }).catch(error => {
            return res.status(401).json(error);
        })
    },

    getCartById: async function(req, res){
        const id = req.params.cartId;
    
        const cart = await Cart.findByPk(id);
        if(cart === null){
            return res.status(401).json("Cart not found");
        }
        else{
            return res.status(200).json(cart);
        }
    },

    removeCartById: async function(req, res){
        Cart.destroy({
            where: { 
                id: req.params.cartId
            }
        }).then(result => {
            return res.status(200).json("Cart removed")
          }).catch(error => {
            console.log(error)
          })
          
        },

    updateQuantity: async function(req, res){
        const id = req.params.cartId;
        console.log(req.params.cartId);
        const cart = await Cart.findByPk(id);
        if(cart === null){
            return res.status(401).json("Cart not found");
        }
        else{
           cart.set(req.body);
           cart.save()
           .then(updatedCart => {
               return res.status(200).json(updatedCart)
           }).catch(error => {
               return res.status(401).json(error)
           })
        }
    }
}
