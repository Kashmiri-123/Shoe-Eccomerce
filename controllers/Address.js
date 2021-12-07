const Address = require('../models/Address');
const uuidv1 = require("uuidv1");
const { Op } = require("sequelize");

exports.AddressController = {
    addAddress: async function(req,res){
        const address = new Address(req.body);
        address.id = uuidv1();
        address.save()
            .then(savedAddress => {
                return res.status(200).json(savedAddress);
            }).catch(error => {
                return res.status(401).json(error);
            })
    },

    getAddressByUserId: function(req,res){
        Address.findAll({
            where: {
                creator: req.params.userId,
            }
        })
        .then(address => {
            return res.status(200).json(address);
        }).catch(error => {
            return res.status(401).json(error);
        })
    },

    getAddressById: async function(req, res){
        const id = req.params.addressId;
    
        const address = await Cart.findByPk(id);
        if(address === null){
            return res.status(401).json("Address not found");
        }
        else{
            return res.status(200).json(Address);
        }
    },

    removeAddressById: async function(req, res){
        Address.destroy({
            where: { 
                id: req.params.addressId
            }
        }).then(result => {
            return res.status(200).json("Address removed")
          }).catch(error => {
            console.log(error)
          })
          
        },

    updateAddress: async function(req, res){
        const id = req.params.addressId;
        
        const address = await Cart.findByPk(id);
        if(address === null){
            return res.status(401).json("Address not found");
        }
        else{
           address.set(req.body);
           address.save()
           .then(addrss => {
               return res.status(200).json(addrss)
           }).catch(error => {
               return res.status(401).json(error)
           })
        }
    }
}
