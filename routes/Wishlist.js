const express = require('express');
const router = express.Router();
const {WishlistController} = require('../controllers/Wishlist');

router.post("/add-wishlist", WishlistController.addWishlist);
router.get("/all-wishlist/:userId", WishlistController.getAllWishlistByUserId);
router.get("/wishlist/:wishlistId", WishlistController.getWishlistById);
router.delete("/wishlist-remove/:wishlistId", WishlistController.removeWishlistById);

module.exports = router;