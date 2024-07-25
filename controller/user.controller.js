const sendMailer = require("../config/mail");
const User = require("../model/user.model");
const { sendOtpUi } = require("../utils/htmlformat");
const { hashPassword, comparePassword } = require("../utils/password");
const jwt = require('jsonwebtoken')
module.exports = {
    signup: async (req, res) => {
        try {
            const { user_name, user_email, user_password, user_mobile } = req.body;
            console.log(req.body)
            const hashPass = await hashPassword(user_password)
            console.log(hashPass)
            const existUser = await User.findOne({ user_email: user_email })

            if (existUser) {
                res.json({
                    message: "email id already exist"
                })
            } else {
                await User.create({
                    user_name, user_email, user_password: hashPass, user_mobile
                })
                    .then((user) => {
                        req.flash('info', 'Thank you for registration');
                        return res.redirect('/signin');
                    })
                    .catch((err) => {
                        res.status(500).json({
                            success: false,
                            message: err
                        })
                    })

            }

        } catch (error) {
            console.log(error)
        }
    },
    signin: async (req, res) => {
        const { user_email, user_password } = req.body
        const existUser = await User.findOne({ user_email: user_email })
        if (!existUser) {
            // res.json({ message: "user not found" })
            req.flash('info', 'user not found')
            return res.redirect('/signin')
        }
        try {
            const hashPass = existUser.user_password
            const matchPass = await comparePassword(user_password, hashPass)
            console.log(matchPass)
            if (!matchPass) {
                // res.json({ message: "password not match" })
                req.flash('info', 'password not match')
                return res.redirect('/signin')
            }

            const payload = {
                id: existUser._id,
                roleId: existUser.user_role_id
            }

            const user = {
                name: existUser.user_name,
                email: existUser.user_email,
            }
            const token = jwt.sign(payload,
                "userkey",
                { expiresIn: "1h" })
            res.cookie('token', token, { httpOnly: true });
            res.cookie('user', user, { httpOnly: true });
            req.flash('info', 'login successfully!')
            res.redirect('/')
        } catch (error) {
            console.log(error)
        }
    },
    sendVerifyLinkForForgot: async (req, res) => {
        try {
            const { user_email } = req.body;
            const user = await User.findOne({ user_email: user_email });
            if (!user) {
                req.flash('info', 'email id not exist!')
                return res.redirect('/forget')
            }

            const link = `${process.env.SERVER_URL}/changePassword/${user_email}`;
            const getMail = await sendMailer(user_email, 'forgot password',
                sendOtpUi(user.user_name, link))
            console.log(getMail)
            req.flash('info', 'check your mail')
            return res.redirect('/forget')
        } catch (error) {
            console.log(error)
        }
    },
    changePassword: async (req, res) => {
        console.log(req.body)
        const { user_email, user_password, match_password } = req.body;
        const existUser = await User.findOne({ user_email: user_email })
        if (!existUser) {
            req.flash('info', 'link is expired')
            return res.redirect(`/forget`)
        }

    },
    updatePassword: async (req, res) => {
        try {
            const { user_password, new_password, confirm_password } = req.body;
            const email = req.cookies.user.email;
            console.log(email)
            const existUser = await User.findOne({ user_email: email })
            console.log(existUser)
            const old_password = await comparePassword(user_password, existUser.user_password)

            if (!old_password) {
                res.json("old password not match")
            }
            console.log(new_password)
            console.log(confirm_password)
            if (new_password !== confirm_password) {
                res.json("confirm password not match")
            }

            const hashNewPass = await hashPassword(new_password)
            const update = await User.updateOne(
                { user_email: email },
                {
                    user_password: hashNewPass
                }
            )
            if (update) {
                // res.json("password updated")
                res.redirect('/')
            }
        } catch (error) {
            console.log(error)
        }
    }
}