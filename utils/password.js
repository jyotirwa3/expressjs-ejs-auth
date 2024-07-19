const bcrypt = require('bcryptjs')
exports.hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        return hash
    } catch (error) {
        console.log(error)
    }
}

exports.comparePassword = async (password, hashPass) => {
    try {
        const match = await bcrypt.compare(password, hashPass);
        return match
    } catch (error) {
        console.log(error)
    }
}