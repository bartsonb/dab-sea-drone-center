const express = require('express');
const router = express.Router();

let boatDB = [
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
    res.json(boatDB);
});

// @route   POST api/boats/
// @desc    Parsing and saving commands for boats.
// @access  Public
module.exports = router.post('/', (req, res) => {
    let { id, command } = req.body;

    if ('id' in req.body && 'command' in req.body) {
        let boat = boatDB.filter(boat => boat.id === id);

        if (boat instanceof Object) {
            boat.commands.push(command);
        } else {
            boatDB.push({ id: id, command: command })
        }
    }

    res.json({ success: false });
});