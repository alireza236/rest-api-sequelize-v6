const express = require('express')

const router = express.Router()

const categoryTicket = require('../controllers/categoryTicketController')

router.get('/', categoryTicket.getCategoryTicket)
router.post('/', categoryTicket.createCategoryTicket)

module.exports = router
