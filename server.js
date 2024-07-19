const express = require('express')
const app = express()
const port = 5500
const User = require('./route/user.route')
const web = require('./route/pageRoute')
const cookieParser = require('cookie-parser');
const flash = require('express-flash');
const session = require('express-session');
require('dotenv').config()

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(session(
    {
        secret: 'mysecretKey',
        resave: false,
        saveUninitialized: true
    }
))
app.use(flash())
app.set('view engine', 'ejs');
app.use(express.static('views'))


require('./config/db').db()
app.use('/api/user', User)
app.use('/', web)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))