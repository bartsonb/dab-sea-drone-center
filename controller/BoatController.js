const { check, validationResult } = require('express-validator');
const BoatModel = require('../models/BoatModel');

let database = [
    {
        id: 1,
        commands: [ 'MOVE', 'LEFT' ]
    },
    {
        id: 2,
        commands: [ 'MOVE' ]
    }
];

// @route   GET /api/boats
exports.index = (req, res) => {
    res.json(database);
};

// @route   GET /api/boats/:id
exports.show = (req, res) => {
    if (!validationResult(req).isEmpty()) return res.status(422).json({ errors: validationResult(req).array() });

    // Respond with boat
    let boat = database.find(boat => boat.id === req.params.id);
    res.json(boat);

    // Clear command array
    boat.commands = [];
};

exports.show.validate = [
    check('id','Boat not found.').toInt().isIn(database.map(boat => boat.id))
];

// @route   POST /api/boats
exports.store = (req, res) => {
    if (!validationResult(req).isEmpty()) return res.status(422).json({ errors: validationResult(req).array() });

    database.forEach(boat => {
        if (boat.id === parseInt(req.body.id)) {
            boat.commands.push(req.body.command);
            res.json(boat);
        }
    });
};

exports.store.validate = [
    check('id').isNumeric().isIn(database.map(boat => boat.id)),
    check('command').isString().isIn([
        'MOVE_STRAIGHT',
        'MOVE_LEFT',
        'MOVE_RIGHT',
        'STOP',
        'RETURN_HOME'
    ])
];