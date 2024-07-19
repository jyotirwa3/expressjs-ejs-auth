const { Router } = require("express");
const router = Router()
const User = require('../controller/user.controller')
router.post('/signup', User.signup)
router.post('/signin', User.signin)
router.post('/sendForgetMail', User.sendVerifyLinkForForgot)
router.post('/change-password', User.changePassword)

module.exports = router