const BoatModel = require('../models/BoatModel');
const Joi = require('@hapi/joi');
const { only, except } = require('../lib/objectHelpers');

// @route   GET /api/boats
// @returns Array of all boats
exports.index = (req, res) => {
    BoatModel.find(
        {},
        '-_id -__v',
        (err, boats) => {
            return res.send(boats.map(boat => boat));
    });
};

// @route   GET /api/boats/:id
// @returns Specific boat, selected by id
exports.show = (req, res) => {
    BoatModel.findOne(
        { id: parseInt(req.params.id) },
        '-_id -__v',
        (err, boat) => {
            return (boat) ? res.json(boat) : res.status(404).json({'message': 'Boat not found.'});
    });
};

// @route   POST /api/boats/:id
// @desc
// @returns Specific boat, selected by id, after update
exports.update = (req, res) => {
    let { value, error } = Joi.object({
        command: Joi.string(),
        wayPoints: Joi.array().items(Joi.array().min(2).max(2).required().items(Joi.number().required())),
        coordinates: Joi.array().items(Joi.array().min(2).max(2).required().items(Joi.number().required())),
        startPoint: Joi.number(),
        position: Joi.array().min(2).max(2).items(Joi.number()),
        heading: Joi.number(),
        speed: Joi.number(),
        clear: Joi.boolean()
    }).validate(req.body, { abortEarly: false, allowUnknown: true });

    if (error) return res.send(error);

    BoatModel.findOneAndUpdate(
        { id: parseInt(req.params.id) },
        { ...value },
        { 
            useFindAndModify: false, 
            new: true,
            fields: '-_id -__v'
        },
        (err, boat) => {
            if (!boat) return res.status(404).json({'message': 'Boat not found.'});

            return (value.clear)
                ? res.send(only(['coordinates', 'command', 'wayPoints'], boat))
                : res.send(boat);
        }
    );
};