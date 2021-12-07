// const Address = require('../models/Address');
// const uuidv1 = require("uuidv1");
// const { Op } = require("sequelize");

// exports.CartController = {
//     addAddress: async function(req,res){
//         const address = new Address(req.body);
//         address.id = uuidv1();
//         address.save()
//             .then(savedAddress => {
//                 return res.status(200).json(savedAddress);
//             }).catch(error => {
//                 return res.status(401).json(error);
//             })
//     },

//     getAllCartsByUserId: function(req,res){
//         Address.findAll({
//             where: {
//                 creator: req.params.userId,
//             }
//         })
//         .then(cart => {
//             return res.status(200).json(cart);
//         }).catch(error => {
//             return res.status(401).json(error);
//         })
//     },

//     getCartById: async function(req, res){
//         const id = req.params.cartId;
    
//         const cart = await Cart.findByPk(id);
//         if(cart === null){
//             return res.status(401).json("Cart not found");
//         }
//         else{
//             return res.status(200).json(cart);
//         }
//     },

//     removeCartById: async function(req, res){
//         Cart.destroy({
//             where: { 
//                 id: req.params.cartId
//             }
//         }).then(result => {
//             return res.status(200).json("Cart removed")
//           }).catch(error => {
//             console.log(error)
//           })
          
//         },

//     updateQuantity: async function(req, res){
//         const id = req.params.cartId;
//         console.log(req.params.cartId);
//         const cart = await Cart.findByPk(id);
//         if(cart === null){
//             return res.status(401).json("Cart not found");
//         }
//         else{
//            cart.set(req.body);
//            cart.save()
//            .then(updatedCart => {
//                return res.status(200).json(updatedCart)
//            }).catch(error => {
//                return res.status(401).json(error)
//            })
//         }
//     }
// }
