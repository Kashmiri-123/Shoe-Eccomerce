const express = require('express');
const router = express.Router();
const {CartController} = require('../controllers/Cart');

router.post("/add-cart", CartController.addCart);
router.get("/all-cart/:userId", CartController.getAllCartsByUserId);
router.get("/cart/:cartId", CartController.getCartById);
router.delete("/cart-remove/:cartId", CartController.removeCartById);
router.put("/cart-update/:cartId", CartController.updateQuantity);

module.exports = router;