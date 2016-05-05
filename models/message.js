var mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
    from: {
<<<<<<< HEAD
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    to: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
=======
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
>>>>>>> collab-branch
    },
    text: {
        type: String,
        required: true
    }
<<<<<<< HEAD

=======
>>>>>>> collab-branch
});

var Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
