const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

// Custom Modules
const NodeMailer = require('../otherFunctions/NodeMailer')
const userAuth = require('../otherFunctions/userAuth')
const AdminSchema = require('../schemas/Admin')
const StudentSchema = require('../schemas/Student')

// /admin/area
router.get('/area', userAuth.isLoggedIn, async (req, res) => {
    res.render('adminArea.ejs')
})

// /admin/scanner
router.get('/scanner', userAuth.isLoggedIn, async (req, res) => {
    res.render('adminScanner.ejs')
})

router.post('/scanner/post', userAuth.isLoggedIn, async (req, res) => {
    const { Base64String } = req.body
    let studentJSON = undefined

    // Getting Student JSON Data
    try{
        studentJSON = JSON.parse(Buffer.from(Base64String, 'base64').toString('utf-8'))
    } catch(err) {
        return res.json({ success: false, message: 'wrong_url_entered' })
    }

    // Checking if User already Registered
    let StudentData = await StudentSchema.findOne({ studentId: studentJSON.studentId })
    if (!StudentData) return res.json({ success: false, message: 'student_not_found' })
    if (StudentData.entryRegistered) return res.json({ success: false, message: 'already_registered' })
    
    // Registering User
    await StudentSchema.findOneAndUpdate({ studentId: studentJSON.studentId }, {
        entryRegistered: true,
        entryRegisteredAt: Date.now(),
        entryRegisteredBy: req.session.user.fullName
    }).exec()

    res.json({ success: true, data: studentJSON })
})

// /admin/view-scanners
router.get('/view-scanners', userAuth.isLoggedIn, async (req, res) => {
    let UserData = await AdminSchema.find({ })
    let text = '<h2>Registered Scanners</h2>'
    UserData.forEach(user => {
        text += `<h4>${user.fullName} - ${user.emailId}</h4>`
    })
    res.send(text)
})

// /admin/register
router.get('/register', userAuth.isLoggedIn, userAuth.isDevik, async (req, res) => {
    res.render('adminRegister.ejs')
})

// /admin/register/post POST
router.post('/register/post', userAuth.isLoggedIn, userAuth.isDevik, async (req, res) => {
    const { fullname, email, password } = req.body

    // Validating User Details
    if (!fullname) return res.json({ success: false, error: 'no_fullname' })
    if (!email) return res.json({ success: false, error: 'no_email' })
    if (!password) return res.json({ success: false, error: 'no_password' })

    if (fullname.length < 1) return res.json({ success: false, error: 'no_fullname' })
    if (email.length < 1) return res.json({ success: false, error: 'no_email' })
    if (password.length < 8) return res.json({ success: false, error: 'no_password' })

    // Checking if User already Exists
    let UserData = await AdminSchema.findOne({ emailId: email })
    if (UserData) return res.json({ success: false, error: 'user_already_exists' })

    // Creating New User
    let newUserData = await new AdminSchema({
        fullName: fullname,
        emailId: email,
        password: jwt.sign({ password: password }, process.env.PASSWORD_HASH_SECRET)
    })

    await newUserData.save().catch(err => {
        return res.json({ success: false, error: 'mongodb_error' })
    })

    res.json({ success: true })
})

// /admin/login
router.get('/login', userAuth.isLoggedOut, async (req, res) => {
    res.render('adminLogin.ejs')
})

// /admin/login/post POST
router.post('/login/post', userAuth.isLoggedOut, async (req, res) => {
    const { email, password } = req.body

    // Validating Login Details
    if (!email) return res.json({ success: false, error: 'no_email' })
    if (!password) return res.json({ success: false, error: 'no_password' })

    if (email.length < 1) return res.json({ success: false, error: 'no_email' })
    if (password.length < 1) return res.json({ success: false, error: 'no_password' })

    // Checking if User Exists
    let UserData = await AdminSchema.findOne({ emailId: email })
    if(!UserData) return res.json({ success: false, error: 'user_not_found' })

    // Verifying Password
    const passwordVerify = jwt.verify(UserData.password, process.env.PASSWORD_HASH_SECRET)
    if (passwordVerify.password != password) return res.json({ success: false, error: 'wrong_password' })

    // Logging in User
    req.session.isLoggedIn = true
    req.session.user = {
        fullName: UserData.fullName,
        emailId: UserData.emailId
    }

    if(UserData.isDevik == true){
        req.session.isDevik = true
    }

    // User Logged In
    res.json({ success: true, message: 'user_logged_in' })
})

// /admin/logout POST
router.post('/logout', userAuth.isLoggedIn, async (req, res) => {
    req.session.destroy()
    res.json({ success: true, message: 'user_logged_out' })
})

module.exports = router
