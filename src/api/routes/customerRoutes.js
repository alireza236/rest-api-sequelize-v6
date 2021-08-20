const express = require('express')

const router = express.Router()

const customer = require('../controllers/customerController')

router.get('/', customer.getCustomer)
router.post('/', customer.createCustomer)

module.exports = router
