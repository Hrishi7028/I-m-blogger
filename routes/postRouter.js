const express= require('express');
const { createPost, getAllPosts, deletePost } = require('../controllers/createPost');
const router = express.Router();
const AuthMiddleware = require('../middlewares/AuthMiddleware')

router.post('/create_post',AuthMiddleware,createPost);
router.get('/get_all_posts/:id/:page',AuthMiddleware,getAllPosts)
router.get('/delete_post/:id',AuthMiddleware,deletePost)

module.exports = router;