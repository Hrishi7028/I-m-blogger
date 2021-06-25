const express = require('express');
const { register, registerValidation } = require('../controllers/userController');
const router = express.Router();


// user registration router
router.post('/register',registerValidation,register);

module.exports = router;