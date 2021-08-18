const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    passwordToken:{
        type:String
    },
    tokenExpire:{
        type:Date
    }
}, { timestamps: true })

module.exports = mongoose.model('user',userSchema)