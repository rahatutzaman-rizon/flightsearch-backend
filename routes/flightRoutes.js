const express = require('express');
const router = express.Router();
const axios = require('axios');
const Flight = require('../models/flight.model');

// Helper function to validate and format date
const formatDate = (dateString) => {
  if (!dateString) return null;

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    throw new Error('Invalid date format');
  }

  date.setUTCHours(0, 0, 0, 0);
  return date;
};

// Process and format flight data
const processFlightData = (flights) => {
  return flights.map(flight => ({
    ...flight,
    local_departure: new Date(flight.local_departure),
    local_arrival: new Date(flight.local_arrival),
    route: flight.route?.map(route => ({
      ...route,
      local_departure: new Date(route.local_departure),
      local_arrival: new Date(route.local_arrival)
    })) || []
  }));
};

router.post('/search', async (req, res) => {
  try {
    const { from, to, start, end, isRoundTrip } = req.body;

    // Validate required fields
    if (!from || !to || !start) {
      return res.status(400).json({
        error: 'Missing required fields: from, to, and start date are required'
      });
    }

    if (isRoundTrip && !end) {
      return res.status(400).json({
        error: 'End date is required for round-trip searches'
      });
    }

    // Format dates
    const startDate = formatDate(start);
    const endDate = isRoundTrip ? formatDate(end) : formatDate(start);

    if (!startDate) {
      return res.status(400).json({
        error: 'Invalid start date format'
      });
    }

    // Add one day to endDate to include the entire end date in search
    const endDateQuery = new Date(endDate);
    endDateQuery.setDate(endDateQuery.getDate() + 1);

    // Build MongoDB query
    const query = {
      flyFrom: from.toUpperCase(),
      flyTo: to.toUpperCase(),
      local_departure: {
        $gte: startDate,
        $lt: endDateQuery
      }
    };

    // First try to get flights from database
    let flights = await Flight.find(query);

    // If no flights found in database, fetch from external API
    if (flights.length === 0) {
      const apiPayload = {
        from: from.toUpperCase(),
        to: to.toUpperCase(),
        start: startDate.toISOString().split('T')[0],
        end: endDate.toISOString().split('T')[0],
        isRoundTrip,
        returnDepartureDateTimeRange: isRoundTrip ? endDate.toISOString().split('T')[0] : null,
        whenDate: startDate.toISOString().split('T')[0]
      };

      try {
        const response = await axios.post(
          process.env.FLIGHT_API_URL || 'https://api.fakeflighttickets.com/ticket/flights',
          apiPayload,
          {
            headers: { 'Content-Type': 'application/json' },
            timeout: 10000 // 10 second timeout
          }
        );

        if (response.data && Array.isArray(response.data)) {
          const processedFlights = processFlightData(response.data);
          await Flight.insertMany(processedFlights);
          flights = processedFlights;
        } else {
          return res.status(404).json({
            success: false,
            error: 'No flights found from external API'
          });
        }
      } catch (apiError) {
        console.error('External API error:', apiError.message);
        return res.status(502).json({
          success: false,
          error: 'Failed to fetch flights from external API',
          message: apiError.message
        });
      }
    }

    res.json({
      success: true,
      count: flights.length,
      flights
    });

  } catch (error) {
    console.error('Flight search error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message
    });
  }
});

module.exports = router;
