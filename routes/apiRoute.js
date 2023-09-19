const express = require('express')
const router = express.Router()

// /api
router.get('/', async (req, res) => {
    res.status(200).json({ success: true, message: `API Route Working!`, timestamp: Date.now() })
})

// /api/contact
router.post('/contact', async (req, res) => {
    res.json({ success: true, message: 'Working!', timestamp: Date.now() })
})

module.exports = router
