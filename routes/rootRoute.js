const express = require('express')
const router = express.Router()

// favicon.ico
router.get('/favicon.ico', async (req, res) => {
    res.sendFile(`${process.cwd()}/views/assets/favicon.ico`)
})

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

// /committee
router.get('/committee', async (req, res) => {
    res.render('committee.ejs')
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
