const router = require('express').Router();

// @route   GET api/online/
module.exports = router.get('/', (req, res) => {
    res.json({
        success: true
    });
});