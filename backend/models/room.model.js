const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let roomSchema = new Schema ({
    username: {
        type: String,
        required: true,
    },
    message: {
        type: String,
    }, 
    timestamp: {
        type: Date,
    }
});

module.exports = mongoose.model('Room', roomSchema);