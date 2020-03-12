const router = require('express').Router();
const UtilityController = require('../../controller/UtilityController');
const AuthMiddleware = require('../../middleware/AuthMiddleware');

// @route   GET api/utility/commands
module.exports = router.get('/commands', AuthMiddleware, UtilityController.commands);

// @route GET /api/utility/online
module.exports = router.get('/online', UtilityController.online);