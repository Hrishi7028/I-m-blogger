const express = require('express');
const { createPost, getAllPosts, deletePost, homePage, detailPost, commentRouter } = require('../controllers/createPost');
const router = express.Router();
const AuthMiddleware = require('../middlewares/AuthMiddleware')


router.get('/home/:page',homePage)

router.post('/create_post', AuthMiddleware, createPost);

router.post('/add_comment',AuthMiddleware, commentRouter)

router.get('/get_all_posts/:id/:page', AuthMiddleware, getAllPosts)

router.get('/delete_post/:id', AuthMiddleware, deletePost)

router.get('/explore/:id',detailPost)

module.exports = router;