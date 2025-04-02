const express = require('express');
const path = require('path');
const videoRoutes = require('./routes/videos');

const app = express();
const port = 3000; // Or any port you prefer

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files (CSS, JS, Images)
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies (standard form submissions)
// Note: bodyParser.json() is applied within routes/videos.js for API routes

// Routes
// Use video routes for root AND specific API paths etc handled within it
app.use('/', videoRoutes);

// Basic error handler (Catch 404s - Put AFTER your routes)
app.use((req, res, next) => {
  res.status(404).send("Sorry, page not found!");
});

// General error handler (Put LAST)
app.use((err, req, res, next) => {
  console.error(err.stack); // Keep essential server error logging
  res.status(500).send('Something broke on the server!');
});

// Start Server
app.listen(port, () => {
  console.log(`Server running. Base URL: http://localhost:${port}`);
});
