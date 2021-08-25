const express = require('express');
const { register, registerValidation, login, loginValidation, forget_password_controller, reset_password, reset_PasswordValidation } = require('../controllers/userController');
const router = express.Router();


// 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

// user registration router
router.post('/register', registerValidation, register);

// user login router
router.post('/login', loginValidation, login)

// forget password router
router.post('/forget-password', forget_password_controller)

router.post('/reset-password/:clientId', reset_PasswordValidation, reset_password)
module.exports = router;