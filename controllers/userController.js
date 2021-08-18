require('dotenv').config({ path: '../.env' })
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const sgMail = require('@sendgrid/mail');
const { v4: uuidv4 } = require('uuid');
 // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

sgMail.setApiKey(process.env.SENDGRID_API_KEY);




const userToken = (user) => {
    return (jwt.sign({ user }, process.env.TOKEN_KEY, {
        expiresIn: '7d'
    }))
}


// user registration validation
module.exports.registerValidation = [
    body('name').not().isEmpty().trim().withMessage('Name shoud be entered'),
    body('email').not().isEmpty().trim().withMessage('Email shoud be entered'),
    body('password').isLength({ min: 8 }).withMessage('password length should minimum 8')
]

// registratio of user
module.exports.register = async (req, res) => {

    const { name, email, password } = req.body;

    const errors = validationResult(req, res);
    if (!errors.isEmpty()) {
        return res.status(500).json({
            errors: errors.array()
        });
    }

    try {
        const checkUser = await User.findOne({ email });
        if (checkUser) {
            return res.status(500).json({ errors: [{ msg: 'Email already exist' }] })
        }

        const salt = await bcrypt.genSalt(10);
        const hashed_Password = await bcrypt.hash(password, salt);
        try {
            const user = await User.create({
                name,
                email,
                password: hashed_Password
            });

            const token = userToken(user);

            const msg = {
                to: user.email,
                from: 'hrishikeshsuryavanshi513@gmail.com',
                subject: 'Sign up Successfuly!!',
                html: `<strong>Thanks for using I'm-Blooger web app</strong>`,
            };

            (async () => {
                try {
                    await sgMail.send(msg);
                } catch (error) {
                    console.error(error);

                    if (error.response) {
                        console.error(error.response.body)
                    }
                }
            })();

            return res.status(200).json({
                msg: 'Account has been created successfully',
                token
            })
        } catch (error) {
            return res.status(509).json({
                errors: [{ msg: "data has not saved" }]
            })
        }
    } catch (error) {
        return res.status(509).json([{
            errors: [{ msg: error }]
        }])
    }
}

// login validation
module.exports.loginValidation = [
    body('email').not().isEmpty().withMessage('Email shoud be entered'),
    body('password').isLength({ min: 8 }).withMessage('password length should minimum 8')
]


// login of user
module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(500).json({
            errors: errors.array()
        })
    }
    try {
        const checkEmail = await User.findOne({ email });
        if (!checkEmail) {
            return res.status(404).json({
                errors: [{ msg: "Email does not exist Enter correct email" }]
            })
        }
        try {
            const user = await User.findOne({ email });
            const isMatched = await bcrypt.compare(password, user.password);
            if (!isMatched) {
                return res.status(404).json({
                    errors: [{ msg: "Password is wrong" }]
                })
            }

            const token = userToken(user);
            return res.status(200).json({
                user,
                token
            })

        } catch (error) {
            // console.log(error);
            return res.status(50).json({
                errors: [{ msg: error }]
            })
        }
    } catch (error) {
        // console.log(error);
        return res.status(509).json({
            errors: [{ msg: error }]
        })
    }
}



module.exports.forget_password_controller = async (req, res) => {
    const email = req.body.email
    console.log(email)

    try {
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(404).json({
                error: "User does not exist..."
            })
        }

        const token = uuidv4().toString();
        user.passwordToken = token;
        user.tokenExpire = Date.now() + 900000
        const saveduser = await user.save();
        const msg = {
            to: user.email,
            from: 'hrishikeshsuryavanshi513@gmail.com',
            subject: 'reset password',
            html: '<p>You are requested for change password click this link to change password<strong><a href=`http://localhost:3000/forget/${pareseInt(token)}` target="_"> link</a></strong></p>',
        };

        (async () => {
            try {
                await sgMail.send(msg);
            } catch (error) {
                console.error(error);

                if (error.response) {
                    console.error(error.response.body)
                }
            }
        })();
        console.log(saveduser)
        return res.json({
            
            msg: "Verification link has been sent to your email-id successfully!!"
        })

    } catch (err) {
        console.log(err)
    }


}