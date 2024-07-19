const { Router } = require("express");
const router = Router()

router.get("/", (req, res) => {
    if (!req?.cookies?.user) {
        req.flash('info', 'Please firstly should be login');
        res.redirect("/signin");
    }
    const user = req.cookies.user;
    res.render("dashboard", { user, messages: req.flash('info') })
})

router.get('/signup', (req, res) => {
    res.render('signup')

})
router.get('/signin', (req, res) => {
    res.render('signin', { messages: req.flash('info') })
})
router.get('/forget', (req, res) => {
    res.render('forget', { messages: req.flash('info') })
})
router.get('/changePassword/:email', (req, res) => {
    res.render('changePassword', { messages: req.flash('info'),email:req.params.email })
})
router.get('/logout', (req, res) => {
    res.clearCookie('user')
    res.clearCookie('token')
    req.flash('info', 'you are logged out')
    res.redirect('/signin')
})


module.exports = router