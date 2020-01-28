const router = require('express').Router();
const BoatController = require('../../controller/BoatController');

// @route   GET /api/boats
module.exports = router.get('/', BoatController.index);

// @route   GET /api/boats/:id
module.exports = router.get('/:id', BoatController.show);

// @route   POST /api/boats/:id
module.exports = router.post('/:id', BoatController.update);