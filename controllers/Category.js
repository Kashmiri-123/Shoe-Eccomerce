const Category = require('../models/Category');
const uuidv1 = require("uuidv1");

exports.CategoryController = {
    addCategory: function(req,res){
        const category = new Category(req.body);
        category.id = uuidv1();
        category.save()
            .then(savedCategory => {
                return res.status(200).json({category: savedCategory});
            }).catch(error => {
                return res.status(401).json(error);
            })
    },

    getAllCategories: function(req,res){
        Category.findAll({raw: true})
            .then(category => {
                return res.status(200).json(category);
            }).catch(error => {
                return res.status(401).json(error);
            })
    },

    updateCategory: async function(req, res){
        const id = req.params.id;
    
        const category = await Category.findByPk(id);
        if(category === null){
            return res.status(401).json("Category not found");
        }
        else{
           category.set(req.body);
           category.save()
           .then(updatedCategory => {
               return res.status(200).json({category: updatedCategory})
           }).catch(error => {
               return res.status(401).json(error)
           })
        }
    },

    getCategoryById: async function(req, res){
        const id = req.params.id;
    
        const category = await Category.findByPk(id);
        if(category === null){
            return res.status(401).json("Category not found");
        }
        else{
            return res.status(200).json({category: category});
        }
    },
}
