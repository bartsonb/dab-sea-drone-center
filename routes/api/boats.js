const router = require('express').Router();
const BoatController = require('../../controller/BoatController');
const AuthMiddleware = require('../../middleware/AuthMiddleware');

// @route   GET /api/boats
module.exports = router.get('/', AuthMiddleware, BoatController.index);

// @route   GET /api/boats/:id
module.exports = router.get('/:id', AuthMiddleware, BoatController.show);

// @route   POST /api/boats/:id
module.exports = router.post('/:id', AuthMiddleware, BoatController.update);