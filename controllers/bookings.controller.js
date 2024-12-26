const { StatusCodes } = require('http-status-codes');
const Booking = require('../models/booking.models');
const Flight = require('../models/flights.models');

// Book Flight
exports.bookFlight = async (req, res) => {
  try {
    const { flightId, userInfo } = req.body;

    if (!flightId || !userInfo || !userInfo.name || !userInfo.email) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Invalid booking data. Flight ID and user information are required.',
      });
    }

    const flight = await Flight.findById(flightId);

    if (!flight) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Flight not found' });
    }

    const booking = new Booking({
      flightId,
      userInfo,
    });

    const savedBooking = await booking.save();

    res.status(StatusCodes.CREATED).json({
      message: 'Flight booked successfully',
      booking: savedBooking,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Error booking flight',
      error: error.message,
    });
  }
};

// Get All Bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('flightId', 'from to date price airline');
    res.status(StatusCodes.OK).json({ bookings });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error fetching bookings', error: error.message });
  }
};
