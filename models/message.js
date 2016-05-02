var mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
    from: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    to: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    text: {
        type: String,
        required: true
    }

});

var Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
