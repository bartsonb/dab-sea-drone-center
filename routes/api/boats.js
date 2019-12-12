const express = require('express');
const router = express.Router();

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
module.exports = router.post('/', (req, res) => {
    let { id, command } = req.body;

    if (
        req.body.id !== 'undefined' && req.body.command !== 'undefined' &&
        req.body.id !== null && req.body.command !== null
    ) {
        let boat = database.find(boat => boat.id === parseInt(id));

        if (boat !== undefined) boat.commands.push(command);

        res.json(boat);
    } else {
        console.log('Unprocessable Entity');
        res.status(422).end();
    }
});