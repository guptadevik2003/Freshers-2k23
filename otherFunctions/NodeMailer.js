const NodeMailer = require('nodemailer')

module.exports = async ({ from, to, subject, text, html }) => {
    const transporter = NodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.GMAIL_APP_USER,
            pass: process.env.GMAIL_APP_PASS,
        },
        tls: {
            rejectUnauthorized: false,
        },
    })

    const options = { from, to, subject, text, html }

    let sendInfo
    try{
        sendInfo = await transporter.sendMail(options)
    } catch(err){
        console.log(err)
        sendInfo = 'error'
    }

    return sendInfo
}
