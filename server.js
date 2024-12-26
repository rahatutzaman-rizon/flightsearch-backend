require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const flightRoutes = require('./routes/flights');
const bookingRoutes = require('./routes/booking');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.use('/api/flights', flightRoutes);
app.use('/api/bookings', bookingRoutes);

// Server Initialization
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
