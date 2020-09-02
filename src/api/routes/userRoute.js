const express = require('express');

const router = express.Router();

const users = require("../controllers/userController");

router.get('/', users.userList );

router.post('/', users.userCreate );

router.get('/:id', users.getUserById );

module.exports = router;
