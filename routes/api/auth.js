const router = require('express').Router();
const AuthController = require('../../controller/AuthController');
const DelayMiddleware = require('../../middleware/DelayMiddleware');
const AuthMiddleware = require('../../middleware/AuthMiddleware');

// @route   GET api/auth
module.exports = router.get('/', AuthMiddleware, AuthController.show);

// @route   GET api/auth
module.exports = router.post('/', DelayMiddleware, AuthController.login);