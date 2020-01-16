const BoatModel = require('../models/BoatModel');
const Joi = require('@hapi/joi');

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

const schema = {
    show: Joi.object({
        id: Joi.number().valid(...database.map(boat => boat.id)).required()
    }),
    store: Joi.object({
        id: Joi.number().valid(...database.map(boat => boat.id)).required(),
        command: Joi.string().valid(...[ 'STOP', 'RETURN_HOME' ]).required()
    })
};

// @route   GET /api/boats
exports.index = (req, res) => {
    res.json(database);
};

// @route   GET /api/boats/:id
exports.show = (req, res) => {
    let { id } = req.body;

    schema.show.validate({ id: id });

    // Respond with boat
    let boat = database.find(boat => boat.id === id);
    
    res.json(boat);

    // Clear command array
    boat.commands = [];
};

// @route   POST /api/boats
exports.store = (req, res) => {
    let { id, command } = req.body;

    schema.store.validate({ id: id, command: command });

    let boat = database.find(boat => boat.id === id);

    if (boat) {
        boat.commands.push(command);
        res.json(boat);
    }

    res.status(422).json({message: 'Unprocessable Entitiy.'});
};