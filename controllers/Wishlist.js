const Wishlist = require('../models/Wishlist');
const uuidv1 = require("uuidv1");
const { Op } = require("sequelize");

exports.WishlistController = {
    addWishlist: async function(req,res){
        const wishlist = new Wishlist(req.body);
        wishlist.id = uuidv1();

        const oldWishlist = await Wishlist.findAll({
            where: {
                [Op.and]: [
                    {creator: req.body.creator},
                    {product: req.body.product}
                ]
            }, raw: true
        })
        
        if(oldWishlist.length != 0){
            return res.status(200).json("Product already in cart")
        }else{
            wishlist.save()
            .then(savedWishlist => {
                return res.status(200).json(savedWishlist)
            }).catch(error => {
                return res.status(401).json(error);
            })
        }
    },

    getAllWishlistByUserId: function(req,res){
        Wishlist.findAll({
            where: {
                creator: req.params.userId,
            }
        })
        .then(wishlist => {
            return res.status(200).json(wishlist);
        }).catch(error => {
            return res.status(401).json(error);
        })
    },

    getWishlistById: async function(req, res){
        const id = req.params.wishlistId;
    
        const wishlist = await Wishlist.findByPk(id);
        if(wishlist === null){
            return res.status(401).json("Wishlist not found");
        }
        else{
            return res.status(200).json(wishlist);
        }
    },

    removeWishlistById: async function(req, res){
        Wishlist.destroy({
            where: { 
                id: req.params.wishlistId
            }
        }).then(result => {
            return res.status(200).json("Wishlist removed")
          }).catch(error => {
            console.log(error)
          })
          
        }
}
