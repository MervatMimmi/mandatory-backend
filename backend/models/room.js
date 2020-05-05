const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let roomSchema = new Schema({
    roomTitle: {
        type: String,
        required:true
    },
});

module.exports = mongoose.model('Room', roomSchema);