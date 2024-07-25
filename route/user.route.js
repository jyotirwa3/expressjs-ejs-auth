const { Router } = require("express");
const router = Router()
const User = require('../controller/user.controller');
const { verifyToken, isUser, isAdmin } = require("../middleware/verify");
router.post('/signup', User.signup)
router.post('/signin', User.signin)
router.post('/sendForgetMail', User.sendVerifyLinkForForgot)
router.post('/change-password', User.changePassword)
router.post('/update-password', verifyToken, isAdmin, User.updatePassword)

module.exports = router