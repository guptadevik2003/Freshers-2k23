const express = require('express')
const router = express.Router()

// /
router.get('/', async (req, res) => {
    res.render('index.ejs')
})
router.get('/home', async (req, res) => {
    res.redirect('/')
})
router.get('/index', async (req, res) => {
    res.redirect('/')
})

// /scanner
router.get('/scanner', async (req, res) => {
    res.render('scanner.ejs')
})

// /qr
router.get('/qr', async (req, res) => {
    res.render('qr.ejs')
})

module.exports = router
