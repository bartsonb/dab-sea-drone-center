const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

// API Routes
const boats = require('./routes/api/boats');
const online = require('./routes/api/online');

app.use('/api/boats', boats);
app.use('/api/online', online);

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
})