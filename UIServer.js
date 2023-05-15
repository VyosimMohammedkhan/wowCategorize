const express = require('express');
const app = express();
const path = require('path');

// Serve static files from the "public" directory
//app.use(express.static(path.join(__dirname, 'public')));

// Define a route for the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'UI.html'));
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
