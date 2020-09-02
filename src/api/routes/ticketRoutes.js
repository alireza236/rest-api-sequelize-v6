const express = require('express');

const router = express.Router();

const ticket = require("../controllers/ticketController");

router.get('/',ticket.getListTicket );
router.post('/',ticket.createTicket  );

module.exports = router;
