const express = require('express');

const emojis = require('./routes/emojis');
const product = require('./routes/productRoutes');
const users = require('./routes/userRoute');
const merchant = require('./routes/merchantRoute');
const tickets = require('./routes/ticketRoutes');
const customers = require('./routes/customerRoutes');
const categoryTickets = require('./routes/categoryTicketRoutes');
const teams = require('./routes/teamRoutes');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'API - 👋🌎🌍🌏' });
});

router.use('/emojis', emojis);
router.use('/products', product);
router.use('/users', users);
router.use('/merchants', merchant);
router.use('/tickets', tickets);
router.use('/customers', customers);
router.use('/categorytickets', categoryTickets);
router.use('/teams', teams);

module.exports = router;
