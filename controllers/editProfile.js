const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');





module.exports.editName = async (req, res) => {
    // const {id} = req.params;
    const { name, id } = req.body;
    if (name === '') {
        return res.status(500).json({
            errors: [{ msg: 'Please Enter Name properly' }]
        })
    }

    try {
        const user = await User.findOneAndUpdate({ _id: id }, { name: name }, { new: true })
        const token = jwt.sign({
            user
        }, process.env.TOKEN_KEY, { expiresIn: '7d' });
        console.log(user);
        return res.status(200).json({
            msg: "response has been updated successfully",
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ errors: [{ msg: 'Internal Server error 21' }] })
    }

}


module.exports.validatePassword = [
    body('new_pass').isLength({ min: 8 }).withMessage('new password length should minimum 8'),
    body('curr_pass').isLength({ min: 8 }).withMessage('current password is Wrong...'),
]

module.exports.changePassword = async (req, res) => {
    const { curr_pass, new_pass, _id } = req.body
    console.log(curr_pass, new_pass, _id);
    const errors = validationResult(req, res);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(500).json({
            errors: errors.array()
        })
    }

    const user = await User.findById({ _id });
    if (!user) {
        return res.status(500).json({
            errors: [{ msg: 'Something went wrong...' }]
        })
    }
    const isMatched = await bcrypt.compare(req.body.curr_pass, user.password)
    if (!isMatched) {
        return res.status(500).json({
            errors: [{ msg: 'Password is wrong...' }]
        })
    }
    const salt = await bcrypt.genSalt(10);
    const hashed_Password = await bcrypt.hash(new_pass, salt);
    try {
        const newUser = await User.findOneAndUpdate({ _id }, { password: hashed_Password }, { new: true })
        return res.status(200).json({
            newUser,
            msg:'password has changed successfully'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errors: [{ msg: 'Internal server error' }]
        })
    }

}