const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    post_body: {
        type: String,
        required: true
    },

    slug: {
        type: String,
        required: true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }

}, { timestamps: true })

module.exports = mongoose.model('post', postSchema)