const express = require('express')

const router = express.Router()

const emoji = require('../controllers/emojiController')

router.get('/', emoji.getEmoji)
router.post('/', emoji.createEmoji)

module.exports = router
