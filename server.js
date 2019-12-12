const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

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