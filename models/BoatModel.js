const mongoose = require('mongoose');

const BoatSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    commands: {
        type: Array,
        required: true
    }
});

module.exports = BoatModel = mongoose.model('boats', BoatSchema);