const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const {
    signup, 
    signin, 
    getAllUsers,
    updateUser,
    getUserById,
    signout,
    removeUserById,
    forgotPasswordController,
    updatePassword
    } = require('../controllers/Users');

router.post("/signup",
    [
        check("name", "Name should be atleast 3 characters").isLength({min: 3}),
        check("email", "email is required").isEmail(),
        check("password","Password should be atleast 3 characters").isLength({min : 3})
    ],
    signup);
router.post("/signin",
    [
        check("email", "email is required").isEmail(),
    ],
    signin);
router.get("/all-users", getAllUsers);
router.put("/user-update/:id", updateUser);
router.get("/user/:id", getUserById);
router.get("/signout", signout);
router.delete("/user-remove/:id", removeUserById);

router.post("/forgot/password/:id", forgotPasswordController);
router.put("/reset/password/:id", updatePassword);

module.exports = router;