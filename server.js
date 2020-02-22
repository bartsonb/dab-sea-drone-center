const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Database
mongoose
    .connect(process.env.MONGO_DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// API Routes
app.use('/api/boats', require('./routes/api/boats'));
app.use('/api/utility', require('./routes/api/utility'));
app.use('/api/online', require('./routes/api/online'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    // Return react frontend
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname,'client', 'build', 'index.html'));
    })
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
});