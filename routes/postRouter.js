const express= require('express');
const { createPost } = require('../controllers/createPost');
const router = express.Router();

router.post('/create_post',createPost);

module.exports = router;