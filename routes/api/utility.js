const router = require('express').Router();
const UtilityController = require('../../controller/UtilityController');

// @route   GET api/utility/commands
module.exports = router.get('/commands', UtilityController.commands);