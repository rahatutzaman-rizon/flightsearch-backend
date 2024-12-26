const express = require('express');
const router = express.Router();
const { bookFlight, getAllBookings } = require('../controllers/bookings.controller');

router.post('/book', bookFlight);
router.get('/', getAllBookings);

module.exports = router;
