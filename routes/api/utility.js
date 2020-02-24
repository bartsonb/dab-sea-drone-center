const router = require('express').Router();
const UtilityController = require('../../controller/UtilityController');

// @route   GET api/utility/commands
module.exports = router.get('/commands', UtilityController.commands);

// @route GET /api/utility/online
module.exports = router.get('/online', UtilityController.online);