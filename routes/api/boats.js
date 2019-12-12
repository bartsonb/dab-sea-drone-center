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
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    let boat = database.forEach(boat => {
        if (boat.id === parseInt(req.body.id)) boat.commands.push(req.body.command)
    });

    res.json(boat);
});