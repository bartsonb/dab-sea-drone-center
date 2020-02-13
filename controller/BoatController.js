const BoatModel = require('../models/BoatModel');
const Joi = require('@hapi/joi');

let database = [
    {
        id: 1,
        fence: [[12.2010,51.2221], [12.20001,51.222267], [14.214501,52.912267]],
        position: [12.2001,51.2220],
        heading: 0,
        speed: 5,
        wayPoints: [[12.2010,51.2221], [12.20001,51.222267], [14.214501,52.912267]],
        command: "SEARCH"
    },
    {
        id: 2,
        fence: [[12.2010,51.2221], [12.20001,51.222267]],
        position: [12.2001,51.2220],
        heading: 0,
        speed: 5,
        wayPoints: [[12.2010,51.2221], [12.20001,51.222267], [14.214501,52.912267]],
        command: "STOP"
    }
];

// @route   GET /api/boats
// @returns Array of all boats
exports.index = (req, res) => {
    res.json(database);
};

// @route   GET /api/boats/:id
// @returns Specific boat, selected by id
exports.show = (req, res) => {
    let id = parseInt(req.params.id);

    Joi.object({
        id: Joi.number().valid(...database.map(boat => boat.id)).required(),
    }).validate({ id: id });

    let boat = database.find(boat => boat.id === id);

    return (boat) ? res.json(boat) : res.status(404).json({"message": "Boat not found."});
};

// @route   POST /api/boats/:id
// @desc
// @returns Specific boat, selected by id, after update
exports.update = (req, res) => {
    let id = parseInt(req.params.id);
    let { command, position, wayPoints, fence, heading, clear, speed } = req.body;

    Joi.object({
        id: Joi.number().valid(...database.map(boat => boat.id)).required(),
        command: Joi.string().valid('STOP', 'RETURN', 'SEARCH'),
        wayPoints: Joi.array().items(Joi.array().items(Joi.number())),
        fence: Joi.array().items(Joi.array().items(Joi.number())),
        position: Joi.array().items(Joi.number()),
        heading: Joi.number(),
        speed: Joi.number(),
        clear: Joi.boolean()
    }).validate({
        id: id,
        command: command,
        wayPoints: wayPoints,
        fence: fence,
        speed: speed,
        heading: heading
    });

    let boat = database.find(boat => boat.id === id);

    if (boat) {
        if (command) boat.command = command;
        if (position) boat.position = position;
        if (wayPoints) boat.wayPoints = wayPoints;
        if (fence) boat.fence = fence;
        if (heading) boat.heading = heading;
        if (speed) boat.speed = speed;

        if (clear) {
            res.json({ fence: boat.fence, wayPoints: boat.wayPoints, command: boat.command});
            boat.command = null;
        }

        return res.json(boat);
    }

    return res.status(404).json({"message": 'Boat not found.'});
};