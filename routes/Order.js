const express = require('express');
const router = express.Router();
const {OrderController} = require('../controllers/Order');

router.post("/add-order", OrderController.addOrder);
router.get("/all-orders", OrderController.getAllOrders);
router.put("/orders-update/:id", OrderController.updateOrder);
router.get("/order/:id", OrderController.getOrderById);


module.exports = router;