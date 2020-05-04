const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let messageSchema = new Schema({
    message: {
        type: String,
    },
    messageBy: {
        type: String,
        required: true
    },
    chatId: {
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
});

module.exports = mongoose.model('Message', messageSchema);