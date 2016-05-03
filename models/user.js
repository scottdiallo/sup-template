var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true // should not match anything in database
    },
    password: {
        type: String,
        required: true // mean its required
    }
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
