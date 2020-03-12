const router = require('express').Router();
const UserController = require('../../controller/UserController');
const AuthMiddleware = require('../../middleware/AuthMiddleware');

// @route   POST /api/users
module.exports = router.post('/', UserController.store);