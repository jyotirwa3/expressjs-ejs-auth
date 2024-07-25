const jwt = require('jsonwebtoken')
exports.verifyToken = (req, res, next) => {
    try {
        // var token = req.headers.authorization
        var token = req?.cookies?.token
        console.log(token)
        if (token === undefined) {
            return res.json("please enter token")
        }
        // token = token.split(' ')[1]
        /// verify token
        if (!token) {
            return res.json("token not found")
        }
        const verifyToken = jwt.verify(token, 'userkey')
        console.log(verifyToken)
        req.user = verifyToken
        next()
    } catch (error) {
        console.log(error)
        res.json(error)
    }
}

exports.isUser = (req, res, next) => {
    try {
        console.log(req.user)
        const { roleId } = req.user;
        if (roleId === 0) {
            next()
        } else {
            res.json({ message: "not authorized user" })
        }
    } catch (error) {
        console.log(error)
    }
}
exports.isAdmin = (req, res, next) => {
    try {
        const { roleId } = req.user;
        if (roleId === 1) {
            next()
        } else {
            res.json({ message: "not authorized user" })
        }
    } catch (error) {
        console.log(error)
    }
}

