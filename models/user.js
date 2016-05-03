var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
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
// validating a password
UserSchema.methods.validatePassword = function(password, callback){
        bcrypt.compare(password, this.password, function(err, isValid){ // comparing the input password with current password in database
            if(err){
                callback(err);
                return;
            }
            callback(null, isValid);
        });
};

module.exports = User;
