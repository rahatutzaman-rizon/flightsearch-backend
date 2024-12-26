const express = require('express');
const router = express.Router();
const { bookFlight, getAllBookings } = require('../controllers/bookingController');

router.post('/book', bookFlight);
router.get('/', getAllBookings);

module.exports = router;
