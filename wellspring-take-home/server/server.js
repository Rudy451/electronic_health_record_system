const express = require('express');
const app = express();
const cors = require('cors');
const port = 3001;


const recentPatients = require('./recentPatients');
const upcomingVisits = require('./upcomingVisits');

app.use(cors()); // Enable CORS for all routes

// API endpoint for recent patients list
app.get('/api/recent-patients', (req, res) => {
  res.json(recentPatients);
});

// API endpoint for upcoming visits list
app.get('/api/upcoming-visits', (req, res) => {
  res.json(upcomingVisits);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});