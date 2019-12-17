const router = require('express').Router();
let BoatController = require('../../controller/BoatController');

// @route   GET /api/boats
module.exports = router.get('/', BoatController.index);

// @route   GET /api/boats/:id
module.exports = router.get('/:id', BoatController.show.validate, BoatController.show);

// @route   POST /api/boats
module.exports = router.post('/', BoatController.store.validate, BoatController.store);