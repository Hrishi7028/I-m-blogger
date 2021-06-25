const { body, validationResult } = require('express-validator');


// user registration validation
module.exports.registerValidation = [
    body('name').not().isEmpty().withMessage('Name shoud be entered'),
    body('email').not().isEmpty().withMessage('Email shoud be entered'),
    body('password').isLength({min:8}).withMessage('password length should minimum 8')
]

// registratio of user
module.exports.register = (req,res) =>{
    
    const errors = validationResult(req, res);
    if(!errors.isEmpty()) {
        return res.json({
            errors:errors.array()
        })    
    }

    const {name,email,password} = req.body;
    return res.json({
        msg:"Register successfully!!!"
    })
}