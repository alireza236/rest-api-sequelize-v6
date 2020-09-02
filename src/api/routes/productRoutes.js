const express = require('express');

const router = express.Router();

const product = require("../controllers/productController");

router.get('/', product.productList);
router.post('/', product.productCreate);

module.exports = router;
