const mongoose = require('mongoose');

const CommandSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    uuid: {
        type: String,
        required: false
    }
});

module.exports = CommandModel = mongoose.model('command', CommandSchema);