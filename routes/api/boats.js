const express = require('express');
const router = express.Router();

// @route   GET api/boats/
// @desc    Get information of all boats.
// @access  Public
module.exports = router.get('/', (req, res) => {
    res.json([
        {
            id: 1, 
            commands: ['MOVE', 'LEFT']
        }, 
        {
            id: 2, 
            commands: ['MOVE']
        }
    ]);
});

// @route   POST api/boats/
// @desc    Parsing and saving commands for boats.
// @access  Public
module.exports = router.post('/', (res, req) => {
    res.json({
        success: true
    });
});