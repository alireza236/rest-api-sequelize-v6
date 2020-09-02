const express = require('express');

const router = express.Router();

const merchant = require("../controllers/merchantController");

router.get('/', merchant.getListMerchant );

router.post('/', merchant.createMerchantProduct );

module.exports = router;
