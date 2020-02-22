const mongoose = require('mongoose');

const BoatSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    coordinates: {
        type: [[Number]],
        required: false
    },
    position: {
        type: [Number],
        required: false
    },
    command: {
        type: String,
        required: false
    },
    heading: {
        type: Number,
        required: false
    },
    speed: {
        type: Number,
        required: false
    },
    wayPoints: {
        type: [[Number]],
        required: false
    },
    clear: {
        type: Boolean,
        required: false
    }
});

module.exports = BoatModel = mongoose.model('boats', BoatSchema);