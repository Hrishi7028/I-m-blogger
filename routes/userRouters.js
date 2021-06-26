const express = require('express');
const { register, registerValidation, login, loginValidation } = require('../controllers/userController');
const router = express.Router();


// user registration router
router.post('/register',registerValidation,register);

// user login router
router.post('/login',loginValidation,login)

module.exports = router;