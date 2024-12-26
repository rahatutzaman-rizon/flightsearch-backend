const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  flyFrom: String,
  flyTo: String,
  local_departure: Date,
  local_arrival: Date,
  airline: String,
  flight_no: String,
  price: Number
});

const flightSchema = new mongoose.Schema({
  flyFrom: {
    type: String,
    required: true,
    uppercase: true
  },
  flyTo: {
    type: String,
    required: true,
    uppercase: true
  },
  local_departure: {
    type: Date,
    required: true
  },
  local_arrival: {
    type: Date,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  airlines: [String],
  flight_no: String,
  route: [routeSchema],
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '24h' // Documents will be automatically deleted after 24 hours
  }
});

module.exports = mongoose.model('Flight', flightSchema);
