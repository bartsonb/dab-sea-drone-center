const BoatModel = require('../models/BoatModel');
const Joi = require('@hapi/joi');

let database = [
    {
        id: 1,
        coordinates: [[12.2010,51.2221], [12.20001,51.222267], [14.214501,52.912267]],
        position: [12.2001,51.2220],
        heading: 0,
        speed: 5,
        wayPoints: [[12.2010,51.2221], [12.20001,51.222267], [14.214501,52.912267]],
        command: "SEARCH"
    },
    {
        id: 2,
        coordinates: [[12.2010,51.2221], [12.20001,51.222267]],
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
    let { command, position, wayPoints, startPoint, coordinates, heading, clear, speed } = req.body;

    Joi.object({
        id: Joi.number().valid(...database.map(boat => boat.id)).required(),
        command: Joi.string().valid('STOP', 'RETURN', 'SEARCH', 'TEST'),
        wayPoints: Joi.array().items(Joi.array().items(Joi.number())),
        coordinates: Joi.array().items(Joi.array().items(Joi.number())),
        startPoint: Joi.number(),
        position: Joi.array().items(Joi.number()),
        heading: Joi.number(),
        speed: Joi.number(),
        clear: Joi.boolean()
    }).validate({
        id: id,
        command: command,
        wayPoints: wayPoints,
        position: position,
        startPoint: startPoint,
        coordinates: coordinates,
        speed: speed,
        heading: heading
    });

    let boat = database.find(boat => boat.id === id);

    if (boat) {
        if (command) boat.command = command;
        if (position) boat.position = position;
        if (wayPoints) boat.wayPoints = wayPoints;
        if (coordinates) boat.coordinates = coordinates;
        if (heading) boat.heading = heading;
        if (speed) boat.speed = speed;
        if (startPoint) boat.startPoint = startPoint;

        if (clear) {
            res.json({ coordinates: boat.coordinates, wayPoints: boat.wayPoints, command: boat.command});
            boat.command = null;
        }

        return res.json(boat);
    }

    return res.status(404).json({"message": 'Boat not found.'});
};