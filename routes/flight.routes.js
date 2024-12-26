const express = require('express');
const router = express.Router();
const { searchFlights, saveFlights } = require('../controllers/flights.controller');

router.get('/search', searchFlights);
router.post('/', saveFlights);

module.exports = router;
