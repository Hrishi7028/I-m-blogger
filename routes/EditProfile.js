const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../middlewares/AuthMiddleware');
const { editName, changePassword, validatePassword } = require('../controllers/editProfile')



router.post('/edit_name', AuthMiddleware, editName);
router.post('/change_password', [AuthMiddleware,validatePassword], changePassword);

module.exports = router;