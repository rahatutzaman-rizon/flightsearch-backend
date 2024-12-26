const { StatusCodes } = require('http-status-codes');
const Flight = require('../models/flights.models');

// Search Flights
exports.searchFlights = async (req, res) => {
  try {
    const { from, to, date } = req.query;

    if (!from || !to || !date) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Please provide from, to, and date parameters' });
    }

    const flights = await Flight.find({
      from: { $regex: new RegExp(from, 'i') },
      to: { $regex: new RegExp(to, 'i') },
      date,
    });

    if (flights.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'No flights found' });
    }

    res.status(StatusCodes.OK).json({ flights });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error searching flights', error: error.message });
  }
};

// Save Flights
exports.saveFlights = async (req, res) => {
  try {
    const { flights } = req.body;

    if (!Array.isArray(flights) || flights.length === 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid or empty flights data' });
    }

    const savedFlights = await Flight.insertMany(flights);

    res.status(StatusCodes.CREATED).json({
      message: 'Flights saved successfully',
      flights: savedFlights,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Error saving flights',
      error: error.message,
    });
  }
};
