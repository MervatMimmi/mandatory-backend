const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let roomSchema = new Schema({
    roomTitle: {
        type: String,
        required:true
    },
});

module.exports = mongoose.model('Room', roomSchema);
/*let roomSchema = new Schema ({
    username: {
        type: String,
        required: true,
    },
    message: {
        type: String,
    }, 
});

module.exports = mongoose.model('Room', roomSchema);*/