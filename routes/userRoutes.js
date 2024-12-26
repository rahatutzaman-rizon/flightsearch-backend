// const express = require('express');
// const Flight = require('../models/Flight');

// const router = express.Router();

// // Demo Data
// const demoData = [
//   { fromAirport: 'JFK', toAirport: 'LAX', date: '2024-12-25' },
//   { fromAirport: 'LHR', toAirport: 'CDG', date: '2024-12-26' },
//   { fromAirport: 'HND', toAirport: 'SYD', date: '2024-12-27' },
//   // Add more demo data as needed
// ];

// // Get Flights
// router.get('/search', async (req, res) => {
//   const { fromAirport, toAirport, date } = req.query;

//   try {
//     let flights = await Flight.find({ fromAirport, toAirport, date });

//     // If no flights found, return demo data
//     if (flights.length === 0) {
//       flights = demoData.filter(
//         (flight) =>
//           flight.fromAirport === fromAirport &&
//           flight.toAirport === toAirport &&
//           flight.date === date
//       );
//     }

//     res.status(200).json(flights);
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error', error });
//   }
// });

// // Add Flight
// router.post('/add', async (req, res) => {
//   const { fromAirport, toAirport, date } = req.body;

//   try {
//     const flight = new Flight({ fromAirport, toAirport, date });
//     await flight.save();

//     res.status(201).json({ message: 'Flight added successfully', flight });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to add flight', error });
//   }
// });

// module.exports = router;
