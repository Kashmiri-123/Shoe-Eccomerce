const express = require('express');
const router = express.Router();
const {AddressController} = require('../controllers/Address');

router.post("/add-address", AddressController.addAddress);
router.put("/address-update/:addressId", AddressController.updateAddress);
router.get("/address/:addressId", AddressController.getAddressById);
router.get("/all-address/:userId", AddressController.getAddressByUserId);
router.delete("/remove-address/:addressId", AddressController.removeAddressById);

module.exports = router;