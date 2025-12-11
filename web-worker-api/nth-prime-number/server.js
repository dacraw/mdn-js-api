// server.js
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the current directory
// This makes all files (index.html, main.js, prime-finder.js) accessible
// via the server's root path (http://localhost:3000/...)
app.use(express.static(path.join(__dirname)));

app.listen(port, () => {
  console.log(`Web Worker Demo server running at http://localhost:${port}`);
  console.log('Open your browser to http://localhost:3000/');
});