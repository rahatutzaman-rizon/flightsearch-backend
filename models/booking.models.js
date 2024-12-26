const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  flightId: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight', required: true },
  userInfo: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
  },
  bookedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Booking', bookingSchema);
