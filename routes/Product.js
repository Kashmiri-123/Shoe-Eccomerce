const express = require('express');
const router = express.Router();
const {ProductController} = require('../controllers/Product');

router.post("/add-product", ProductController.addProduct);
router.get("/all-products", ProductController.getAllProducts);
router.put("/product-update/:id", ProductController.updateProduct);
router.get("/product/:id", ProductController.getProductById);
router.get("/product-by/category", ProductController.getProductByCategory);
router.delete("/product-remove/:id", ProductController.removeProductById);


module.exports = router;