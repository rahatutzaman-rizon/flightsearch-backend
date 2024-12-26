

const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  date: { type: String, required: true },
  price: { type: Number, required: true },
  airline: { type: String, required: true },
  duration: String,
  departureTime: String,
  arrivalTime: String,
});

module.exports = mongoose.model('Flight', flightSchema);
