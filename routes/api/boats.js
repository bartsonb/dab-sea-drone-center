const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

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

// @route   GET api/boats/
// @desc    Get information of all boats.
// @access  Public
module.exports = router.get('/', (req, res) => {
    res.json(database);
});

// @route   GET api/boats/:id
// @desc    Get information of all boats.
// @access  Public
module.exports = router.get('/:id',  [
        check('id', 'Boat not found.').toInt().isIn(database.map(boat => boat.id))
    ], (req, res) => {
    if (!validationResult(req).isEmpty()) return res.status(422).json({ errors: validationResult(req).array() });

    // Respond with boat
    let boat = database.find(boat => boat.id === req.params.id);
    res.json(boat);

    // Clear command array
    boat.commands = [];
});

// @route   POST api/boats/
// @desc    Parsing and saving commands for boats.
// @access  Public
module.exports = router.post('/', [
    check('id').isNumeric().isIn(database.map(boat => boat.id)),
    check('command').isString().isIn([
        'MOVE_STRAIGHT',
        'MOVE_LEFT',
        'MOVE_RIGHT',
        'STOP',
        'RETURN_HOME'
    ])
], (req, res) => {
    if (!validationResult(req).isEmpty()) return res.status(422).json({ errors: validationResult(req).array() });

    database.forEach(boat => {
        if (boat.id === parseInt(req.body.id)) {
            boat.commands.push(req.body.command);
            res.json(boat);
        }
    });
});