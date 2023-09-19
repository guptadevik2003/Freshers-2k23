const express = require('express')
const router = express.Router()

// Custom Modules
const NodeMailer = require('../otherFunctions/NodeMailer')

// /api
router.get('/', async (req, res) => {
    res.status(200).json({ success: true, message: `API Route Working!`, timestamp: Date.now() })
})

// /api/contact
router.post('/contact', async (req, res) => {
    let { name, email, message } = req.body

    // Validating Inputted Details
    if(!name) return res.json({ success: false, error: 'no_name' })
    if(!email) return res.json({ success: false, error: 'no_email' })
    if(!message) return res.json({ success: false, error: 'no_message' })

    if(name.length < 1) return res.json({ success: false, error: 'no_name' })
    if(email.length < 1) return res.json({ success: false, error: 'no_email' })
    if(message.length < 1) return res.json({ success: false, error: 'no_message' })

    message = message.split('\n')
    message = message.join('<br>')

    // Sending Mail
    let sendInfo = await NodeMailer({
        from: `${name} <form-response@shubharambh.net>`,
        to: 'shubhaarambh2k23@gmail.com',
        subject: `Shubharambh Form`,
        text: message,
        html: `<b>Sender's Email</b><br>${email}<br><br><b>Sender's Name</b><br>${name}<br><br><b>Sender's Message</b><br>${message}`,
    })

    if(sendInfo === 'error'){
        return res.json({ success: false, error: 'email_not_sent' })
    }
    
    res.json({ success: true, message: 'email_sent_successfully' })
})

module.exports = router
