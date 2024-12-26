const Booking = require('../models/Booking');
const Flight = require('../models/Flight');

exports.bookFlight = async (req, res) => {
  try {
    const { flightId, userInfo } = req.body;

    if (!flightId || !userInfo || !userInfo.name || !userInfo.email) {
      return res.status(400).json({
        message: 'Invalid booking data. Flight ID and user information are required.',
      });
    }

    const flight = await Flight.findById(flightId);

    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    const booking = new Booking({
      flightId,
      userInfo,
    });

    const savedBooking = await booking.save();

    res.status(201).json({
      message: 'Flight booked successfully',
      booking: savedBooking,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error booking flight',
      error: error.message,
    });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('flightId', 'from to date price airline');
    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
};
