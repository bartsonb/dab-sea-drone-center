const BoatModel = require('../models/BoatModel');
const Joi = require('@hapi/joi');

// @route   GET /api/boats
// @returns Array of all boats
exports.index = (req, res) => {
    BoatModel.find({}, (err, boats) => {
        return res.send(boats.map(boat => boat));
    });
};

// @route   GET /api/boats/:id
// @returns Specific boat, selected by id
exports.show = (req, res) => {
    BoatModel.findOne({ id: parseInt(req.params.id) }, (err, boat) => {
        return (boat) ? res.json(boat) : res.status(404).json({"message": "Boat not found."});
    });
};

// @route   POST /api/boats/:id
// @desc
// @returns Specific boat, selected by id, after update
exports.update = (req, res) => {
    let { value, error } = Joi.object({
        command: Joi.string(),
        wayPoints: Joi.array().items(Joi.array().items(Joi.number())),
        coordinates: Joi.array().items(Joi.array().items(Joi.number())),
        startPoint: Joi.number(),
        position: Joi.array().items(Joi.number()),
        heading: Joi.number(),
        speed: Joi.number(),
        clear: Joi.boolean()
    }).validate(req.body, { abortEarly: false, allowUnknown: true });

    if (error) return res.send(error);

    BoatModel.findOneAndUpdate(
        { id: parseInt(req.params.id) },
        value,
        { useFindAndModify: false, new: true },
        (err, boat) => {
            if (!boat) return res.status(404).json({"message": "Boat not found."});

            return res.send(boat);
        }
    );
};