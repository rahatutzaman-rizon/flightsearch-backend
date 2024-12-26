const express = require('express');
const router = express.Router();
const { searchFlights, saveFlights } = require('../controllers/flightController');

router.get('/search', searchFlights);
router.post('/', saveFlights);

module.exports = router;
