const Flight = require('../models/Flight');

exports.searchFlights = async (req, res) => {
  try {
    const { from, to, date } = req.query;

    if (!from || !to || !date) {
      return res.status(400).json({ message: 'Please provide from, to, and date parameters' });
    }

    const flights = await Flight.find({
      from: { $regex: new RegExp(from, 'i') },
      to: { $regex: new RegExp(to, 'i') },
      date,
    });

    if (flights.length === 0) {
      return res.status(404).json({ message: 'No flights found' });
    }

    res.status(200).json({ flights });
  } catch (error) {
    res.status(500).json({ message: 'Error searching flights', error: error.message });
  }
};

exports.saveFlights = async (req, res) => {
  try {
    const { flights } = req.body;

    if (!Array.isArray(flights) || flights.length === 0) {
      return res.status(400).json({ message: 'Invalid or empty flights data' });
    }

    const savedFlights = await Flight.insertMany(flights);

    res.status(201).json({
      message: 'Flights saved successfully',
      flights: savedFlights,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error saving flights',
      error: error.message,
    });
  }
};
