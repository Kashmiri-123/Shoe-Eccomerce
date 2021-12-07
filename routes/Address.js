const express = require('express');
const router = express.Router();
const {AddressController} = require('../controllers/Address');

router.post("/add-address", AddressController.addAddress);
router.put("/address-update/:id", AddressController.updateAddress);
router.get("/address/:id", AddressController.getAddressById);
router.get("/all-address/:userId", AddressController.getAddressByUserId);
router.delete("/remove-address/:id", AddressController.removeAddressById);

module.exports = router;