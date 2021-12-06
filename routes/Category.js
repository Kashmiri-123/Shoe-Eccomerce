const express = require('express');
const router = express.Router();
const {CategoryController} = require('../controllers/Category');

router.post("/add-category", CategoryController.addCategory);
router.get("/all-categories", CategoryController.getAllCategories);
router.put("/category-update/:id", CategoryController.updateCategory);
router.get("/category/:id", CategoryController.getCategoryById);


module.exports = router;