const express = require('express');
const router = express.Router();

// @route   GET api/utility/commands
// @desc    Get all available commands
// @access  Public
module.exports = router.get('/commands', (req, res) => {
    res.json([
        'MOVE_STRAIGHT',
        'MOVE_LEFT',
        'MOVE_RIGHT',
        'STOP',
        'RETURN_HOME'
    ]);
});