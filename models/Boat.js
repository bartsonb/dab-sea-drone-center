const mongoose = require('mongoose');

const BoatSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: false,
    },
    coordinates: {
        type: [[Number]],
        required: false
    },
    position: {
        type: [Number],
        required: false
    },
    startPoint: {
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
    lastSignOfLife: {
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
}, {
    timestamps: true
});

module.exports = Boat = mongoose.model('boats', BoatSchema);