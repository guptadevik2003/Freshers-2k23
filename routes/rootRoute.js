const express = require('express')
const router = express.Router()

// Custom Modules
const CounterSchema = require('../schemas/Counter')

// favicon.ico
router.get('/favicon.ico', async (req, res) => {
    res.sendFile(`${process.cwd()}/views/assets/favicon.ico`)
})

// /
router.get('/', async (req, res) => {
    if(process.env.BUILD_MODE === 'production'){
        CounterSchema.findOneAndUpdate({ counterId: 2023 }, { $inc: { homeCounter: 1 } }).exec()
    }
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
    if(process.env.BUILD_MODE === 'production'){
        CounterSchema.findOneAndUpdate({ counterId: 2023 }, { $inc: { committeeCounter: 1 } }).exec()
    }
    const CommitteeData = require('../committeeData.json').data
    res.render('committee.ejs', { data: CommitteeData })
})

// /qr/:BASE64
router.get('/qr/:BASE64', async (req, res) => {
    let BASE64 = req.params.BASE64
    res.render('qr.ejs') 
})

module.exports = router
