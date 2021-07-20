const express= require('express');
const { createPost, getAllPosts } = require('../controllers/createPost');
const router = express.Router();
const AuthMiddleware = require('../middlewares/AuthMiddleware')

router.post('/create_post',AuthMiddleware,createPost);
router.get('/get_all_posts/:id',AuthMiddleware,getAllPosts)

module.exports = router;