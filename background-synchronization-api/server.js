// server.js

const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to serve static files (like index.html, main.js, sw.js)
// '__dirname' refers to the directory where server.js is located.
app.use(express.static(path.join(__dirname)));

// Optional: Define a route for the root (/) to ensure index.html loads
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`✅ Server listening at http://localhost:${port}`);
  console.log(`Open http://localhost:${port} in your browser to test the sync API.`);
});