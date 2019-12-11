const express = require('express');
const router = express.Router();

// @route   GET api/online/
// @desc    Testing online status of service
// @access  Public
module.exports = router.get('/', (req, res) => {
    res.json({
        success: true
    });
});