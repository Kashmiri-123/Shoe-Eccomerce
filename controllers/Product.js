const Product = require('../models/Product');
const uuidv1 = require("uuidv1");

exports.ProductController = {
    addProduct: function(req,res){
        const product = new Product(req.body);
        product.id = uuidv1();
        product.save()
            .then(savedProduct => {
                return res.status(200).json({product: savedProduct})
            }).catch(error => {
                console.log("Error occurred: " + error);
                return res.status(401).json(error);
            })
    },

    getAllProducts: function(req,res){
        Product.findAll()
            .then(product => {
                return res.status(200).json(product)
            }).catch(error => {
                return res.status(401).json(error);
            })
    },

    updateProduct: async function(req, res){
        const id = req.params.id;
    
        const product = await Product.findByPk(id);
        if(product === null){
            return res.status(401).json("Product not found");
        }
        else{
           product.set(req.body);
           product.save()
           .then(updatedProduct => {
               return res.status(200).json(updatedProduct)
           }).catch(error => {
               return res.status(401).json(error)
           })
        }
    },

    getProductById: async function(req, res){
        const id = req.params.id;
    
        const product = await Product.findByPk(id);
        if(product === null){
            return res.status(401).json("Product not found");
        }
        else{
            return res.status(200).json({product: product});
        }
    },

    getProductByCategory: async function(req, res){
        const category = req.body.category;
        console.log("............" +category)
        const product = await Product.findAll({where: {category: category}});
        if(product === null){
            return res.status(401).json("Product not found");
        }
        else{
            return res.status(200).json({product: product});
        }
    }
}
