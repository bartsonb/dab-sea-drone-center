const BoatModel = require('../models/BoatModel');
const Joi = require('@hapi/joi');

let database = [
    {
        id: 1,
        fence: [[12.2010,51.2221], [12.20001,51.222267], [14.214501,52.912267]],
        position: [12.2001,51.2220],
        commands: [ 'SEARCH', 'RETURN' ]
    },
    {
        id: 2,
        fence: [[12.2010,51.2221], [12.20001,51.222267]],
        position: [12.2001,51.2220],
        commands: [ 'SEARCH' ]
    }
];

// @route   GET /api/boats
exports.index = (req, res) => {
    res.json(database);
};

// @route   GET /api/boats/:id
exports.show = (req, res) => {
    let id = parseInt(req.params.id);

    Joi.object({
        id: Joi.number().valid(...database.map(boat => boat.id)).required(),
    }).validate({ id: id });

    let boat = database.find(boat => boat.id === id);

    if (boat) {
        return res.json(boat);
    }

    return res.status(404).json({"message": "Boat not found."});
};

// @route   POST /api/boats/:id
exports.update = (req, res) => {
    let id = parseInt(req.params.id);
    let { command, position } = req.body;

    Joi.object({
        id: Joi.number().valid(...database.map(boat => boat.id)).required(),
        command: Joi.string().valid(...[ 'STOP', 'RETURN', 'SEARCH' ]),
        clear: Joi.boolean()
    }).validate({
        id: id,
        command: command
    });

    let boat = database.find(boat => boat.id === id);

    if (boat) {
        if (command) boat.commands.push(command);
        boat.position = position;
        return res.json(boat);
    }

    return res.status(404).json({"message": 'Boat not found.'});
};