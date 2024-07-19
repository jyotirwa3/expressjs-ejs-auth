const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rwa3.jyoti.sj@gmail.com',
        pass: 'avrp jeui pdzs gznh'
    }
})

function sendMailer(to, subject, html) {
    const options = {
        from: 'rwa3.jyoti.sj@gmail.com',
        to: to,
        subject: subject,
        html: html
    }
    transporter.sendMail(options, (err, info) => {
        if (err) {
            console.log(err)
        } else {
            // console.log("info")
            console.log("send mail")
            return true
        }
    })
}

module.exports = sendMailer