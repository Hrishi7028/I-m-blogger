const express= require('express');
const { createPost } = require('../controllers/createPost');
const router = express.Router();
const AuthMiddleware = require('../middlewares/AuthMiddleware')

router.post('/create_post',AuthMiddleware,createPost);

module.exports = router;